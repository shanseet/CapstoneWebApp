import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const mqtt = require('mqtt');

function ActivePrac(props) {
    const [move, updateMove] = useState("...");
    const [positions, updatePositions] = useState(["..."]);
    const [timeDelays, updateTimeDelays] = useState([]);
    const [sync, updateSync] = useState(-1);
    const [count, updateCount] = useState(0);
    const [isEnding, setEnding] = useState(0);
    const [mqttSub,] = useState(mqtt.connect('ws://broker.hivemq.com:8000/mqtt'));
    const [allMoves, updateMoves] = useState([]);
    const [startTime, updateStart] = useState();
    let history = useHistory();

    useEffect(() => {
        mqttSub.on('connect', function () {
            mqttSub.subscribe("137.132.86.240.G17");
            console.log("topic connected");
            updateStart(new Date());
        });

        mqttSub.on('message', function (topic, msg) {
            let move = { time: new Date() };
            updateCount(count => count + 1);
            let received = msg.toString().split("|");
            updateMove(received[1]);
            move.move = received[1];
            if (received[0]) {
                let dancerArr = [];
                received[0].substring(1).split(" ").forEach((dancer) => {
                    dancerArr.push(dancer);
                })
                updatePositions(dancerArr);
                move.position = dancerArr;
            }
            if (received[2]) {
                let delayArr = [];
                let syncCalc = 0;
                received[2].split(" ").forEach((val) => {
                    delayArr.push((parseFloat(val) * 1000).toFixed(2));
                    syncCalc += Math.max(0, parseFloat(val) * 1000 - 200);
                })
                if (delayArr.length > 1) {
                    syncCalc = Math.max(0, 100 - syncCalc / ((delayArr.length - 1) * 8)).toFixed(1);
                }

                updateTimeDelays(delayArr);
                updateSync(syncCalc);
                move.lag = delayArr;
                move.sync = syncCalc;
            }
            updateMoves(prevState => [...prevState, move]);
            if (received[1] === "logout") {
                mqttSub.end();
                setEnding(3);
                setTimeout(() => { history.push("/"); }, 3000);
            }
        });

        return () => {
            mqttSub.end();
            props.handleStop();
            console.log("disconnecting");
        };
    }, [history, mqttSub, props]);

    useEffect(() => {
        const currentCount = isEnding;
        const timer = currentCount > 0 && setTimeout(() => { setEnding(currentCount - 1) }, 1000);
        return () => clearTimeout(timer);
    }, [isEnding]);

    const labelStyle = {
        color: "#707070",
        fontSize: "1.2rem",
        paddingTop: "1rem",
        paddingBottom: "0.5rem",
        textTransform: "uppercase"
    }

    let positionDelay = positions.map((position, index) => {
        return (
            <Col key={index}>
                <div>{position}</div>
                <div>
                    {timeDelays[index] >= 0 ? timeDelays[index] + "ms" : <br />}
                </div>
            </Col>
        )
    })

    return (
        <div className="pt-5 pb-3" style={{ fontSize: "2rem" }}>
            <div className="fixed-top" style={{ height: "6rem", backgroundColor: "white" }}></div>
            <Row className="text-center">
                <Col className="outline-box py-4">
                    <Row className="justify-content-center">
                        <Col xs={4}>
                            <div style={labelStyle}>Detected Move</div>
                            {count > 0 ? count + "." : ""} {move}
                        </Col>
                        <Col xs={4}>
                            <div style={labelStyle}>Sync</div>
                            <div>{sync !== -1 ? sync + "%" : "-"}</div>
                        </Col>
                    </Row>
                    <br />
                    <div style={labelStyle}>Positions/Delay</div>
                    <Row className="justify-content-center">
                        {positionDelay}
                    </Row>
                </Col>
            </Row>

            <br />
            {isEnding > 0 ?
                <div className="ending-nums">
                    returning to dashboard in
                    <span className="pl-4 pb-1" style={{ fontSize: "3rem", verticalAlign: "bottom" }}>{isEnding}</span>
                </div>
                :
                <button onClick={() => {
                    mqttSub.publish("137.132.86.240.G17", "|logout||");
                    let newprac = { start: startTime, moves: allMoves };
                    console.log(newprac);
                    if (newprac.moves.length) props.sendData(newprac);
                }}
                    className="btn start-btn">
                    LOGOUT
                </button>
            }
        </div>
    )
}

export default ActivePrac;