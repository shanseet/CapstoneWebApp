import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dancerToId from '../../constants/dancerToId';

const mqtt = require('mqtt');

class ActivePrac extends Component {
    constructor(props) {
        super(props);
        this.state = {
            move: "...",
            positions: ["..."],
            timeDelays: [],
            sync: -1,
            count: 0,
            isEnding: 0,
            serverStatus: ("ready to dance!"),
            mqttSub: mqtt.connect('ws://broker.hivemq.com:8000/mqtt'),
            allMoves: [],
            startTime: ""
        };
        this.componentCleanup = this.componentCleanup.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.componentCleanup);
        this.state.mqttSub.on('connect', () => {
            this.state.mqttSub.subscribe(["137.132.86.240.G17", "GUI_DANCE_HELPER/1"]);
            console.log("broker connected");
            this.setState({ startTime: new Date() });
            this.props.setMqttConnected(true);
        });

        this.state.mqttSub.on('message', (topic, msg) => {
            if (topic === "137.132.86.240.G17") {
                this.processMessage(msg);
            } else if (topic === "GUI_DANCE_HELPER/1") {
                const received = msg.toString();
                if (received[0] === "R") {
                    this.setState({ serverStatus: "ready to dance!" });
                } else if (received[0] === "S") {
                    this.setState({ serverStatus: "STOP" });
                } else if (received[0] === "T" && this.state.serverStatus === "ready to dance!") {
                    const str = "timeout: reset to " + received.substring(15);
                    this.setState({ serverStatus: str });
                }
            }
        });
    }

    componentCleanup() {
        console.log("disconnecting");
        this.state.mqttSub.end();
        if (this.state.isEnding === 0 && this.props.iStarted) {
            document.getElementById("logout-btn").click();
        }
        this.props.handleStop();
        return null;
    }

    componentWillUnmount() {
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup);
    }

    startCountdown() {
        this.setState({ isEnding: 3 });
        setTimeout(() => {
            this.setState({ isEnding: 2 });
            setTimeout(() => {
                this.setState({ isEnding: 1 });
            }, 1000);
        }, 1000);
    }

    processMessage(msg) {
        let move = { time: new Date() };
        let received = msg.toString().split("|");
        move.move = received[2];
        this.setState({ move: received[2] });
        if (received[0]) {
            let dancerArr = [];
            let displayArr = [];
            received[0].substring(1).split(" ").forEach((dancer) => {
                dancerArr.push(dancerToId[dancer]);
            })
            received[1].split(" ").forEach((pos) => {
                displayArr.push(pos);
            })
            this.setState({ positions: displayArr });
            move.position = dancerArr;
        }
        if (received[3]) {
            let delayArr = [];
            let avgCalc = 0;
            received[3].split(" ").forEach((val) => {
                delayArr.push((parseFloat(val) * 1000).toFixed(2));
                avgCalc += parseFloat(val) * 1000;
            })
            if (delayArr.length > 1) {
                avgCalc = (avgCalc / (delayArr.length - 1)).toFixed(2);
            }
            this.setState({ timeDelays: delayArr, sync: avgCalc })
            move.lag = delayArr;
            move.sync = avgCalc;
        }
        if (this.props.hasStarted) {
            this.setState(state => {
                const allMoves = [...state.allMoves, move];
                return { allMoves: allMoves };
            });
            this.setState((state) => ({ count: state.count + 1 }));
        }

        if (received[2] === "logout") { //if the logout message is not from the button
            if (received[0] && this.props.iStarted) {
                document.getElementById("logout-btn").click();
            }
            this.state.mqttSub.end();
            this.startCountdown();
            setTimeout(() => this.props.history.push("/practice-history"), 3000);
        }
    }

    render() {
        const labelStyle = {
            color: "#707070",
            fontSize: "1.35rem",
            fontFamily: 'Montserrat',
            paddingTop: "1rem",
            paddingBottom: "0.5rem",
            textTransform: "uppercase"
        }

        const logoutBtn = ( //informs all other clients of logout
            <button id="logout-btn" onClick={() => {
                this.state.mqttSub.publish("137.132.86.240.G17", "||logout||");
                let newprac = { start: this.state.startTime, moves: this.state.allMoves };
                if (newprac.moves.length) this.props.sendData(newprac);
            }}
                className="btn start-btn">
                LOGOUT
            </button>
        )

        let positionDelay = this.state.positions.map((position, index) => {
            return (
                <Col key={index}>
                    <div>{position}</div>
                    <div style={{ fontSize: "2.6rem" }}>
                        {this.state.timeDelays[index] >= 0 ? this.state.timeDelays[index] + "ms" : <br />}
                    </div>
                </Col>
            )
        })

        const serverMsgStyle = {
            height: "6rem",
            backgroundColor: "white",
            color: "#f04968"
        }

        return (
            <div className="pt-4 pb-3" style={{ fontSize: "3.5rem" }}>
                {this.props.hasStarted &&
                    <div className="fixed-top pt-2 secondary-font" style={serverMsgStyle}>
                        {this.state.serverStatus}
                    </div>
                }
                <Row className="text-center mb-4">
                    <Col className="outline-box py-4">
                        <Row className="justify-content-center mb-3">
                            <Col xs={6}>
                                <div style={labelStyle}>Move</div>
                                {this.state.count > 0 ? this.state.count + "." : ""} {this.state.move}
                            </Col>
                            <Col xs={3}>
                                <div style={labelStyle}>Avg delay</div>
                                <div>{this.state.sync !== -1 ? this.state.sync + "ms" : "..."}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div style={labelStyle}>LEFT</div>
                            </Col>
                            <Col>
                                <div style={labelStyle}>CENTER</div>
                            </Col>
                            <Col>
                                <div style={labelStyle}>RIGHT</div>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            {positionDelay}
                        </Row>
                    </Col>
                </Row>
                {this.props.hasStarted ?
                    <div>
                        {this.state.isEnding > 0 ?
                            <div className="ending-nums">
                                redirecting to practice history in
                        <span className="pl-4 pb-1" style={{ fontSize: "3rem", verticalAlign: "bottom" }}>
                                    {this.state.isEnding}
                                </span>
                            </div>
                            :
                            this.props.iStarted && logoutBtn}
                    </div>
                    :
                    <button className="btn start-btn" onClick={() => {
                        this.setState({ count: 0, move: "...", positions: ["..."], timeDelays: [], sync: -1 });
                        this.props.handleStart();
                    }}
                    >START PRACTICE</button>
                }

            </div>
        )
    }
}

export default withRouter(ActivePrac);