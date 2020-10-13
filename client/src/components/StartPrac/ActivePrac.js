import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const mqtt = require('mqtt');

function ActivePrac() {
    // const [mqttData, setMqttData] = useState("nothing heard yet");
    const [move, updateMove] = useState("...");
    const [positions, updatePositions] = useState("...");
    const [timeDelay, updateTimeDelay] = useState("...");

    useEffect(() => {
        let mqttSub = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

        mqttSub.on('connect', function () {
            mqttSub.subscribe("137.132.86.240.G17");
            console.log("topic connected");
        });

        mqttSub.on('message', function (topic, msg) {
            let received = msg.toString().split("|");
            updatePositions(received[0]);
            updateMove(received[1]);
            updateTimeDelay(parseInt(received[2]*1000));
        });

        return () => {
            mqttSub.end();
            console.log("disconnecting")
        };
    }, []);


    const labelStyle = {
        color: "#707070",
        fontSize: "1.2rem",
        paddingTop: "1rem",
        paddingBottom: "0.5rem",
        textTransform: "uppercase"
    }

    return (
        <div className="pt-4" style={{ fontSize: "1.75rem" }}>
            <div className="fixed-top" style={{ height: "6rem", backgroundColor: "white" }}></div>
            <Row className="text-center">
                {/* <Col xs={3} className="outline-box mr-1 d-flex align-items-center justify-content-center">
                    <img src={dancerIcon} alt="dancer" width="80" height="80" />
                </Col> */}
                <Col className="outline-box py-4">
                    <div style={labelStyle}>Move</div>
                    <Row className="justify-content-center">{move}</Row>
                    <br />
                    
                    <Row className="justify-content-center">
                        <Col xs={4}>
                            <div style={labelStyle}>Delay</div>
                            <div>{timeDelay === "..." ? "..." : timeDelay + "ms" } </div>
                        </Col>
                        <Col xs={4}>
                            <div style={labelStyle}>Sync</div>
                            <div>...%</div>
                        </Col>
                    </Row>
                    <br />

                    <div style={labelStyle}>Positions</div>
                    <Row className="justify-content-center">
                        {positions}
                    </Row>
                </Col>
            </Row>

            <br />
            <NavLink to="/" exact>
                <button className="btn start-btn"><span className="end-square"></span>END</button>
            </NavLink>
        </div>
    )
}

export default ActivePrac;