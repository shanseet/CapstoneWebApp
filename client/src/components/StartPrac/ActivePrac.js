import React from 'react';

import { NavLink } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dancerIcon from '../../assets/dance-icon.svg';

class ActivePrac extends React.Component {

    render() {
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
                    <Col xs={3} className="outline-box mr-1 d-flex align-items-center justify-content-center">
                        <img src={dancerIcon} alt="dancer" width="80" height="80" />
                    </Col>
                    <Col className="outline-box py-4">
                        <Row className="justify-content-center">
                            <Col xs={4}>
                                <div style={labelStyle}>Detected Move</div>
                                <div>"..."</div>
                            </Col>
                            <Col xs={4}>
                                <div style={labelStyle}>Sync</div>
                                <div>..%</div>
                            </Col>
                        </Row>
                        <br />
                        <div style={labelStyle}>Dancer Positions</div>
                        <Row className="justify-content-center pb-3">
                            <Col xs={3}>
                                <div>Dancer1</div>
                                <div>+530ms</div>
                            </Col>
                            <Col xs={3}>
                                <div>Dancer1</div>
                                <div>+0ms</div>
                            </Col>
                            <Col xs={3}>
                                <div>Dancer1</div>
                                <div>+230ms</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <br />
                <NavLink to="/" exact>
                    <button className="btn start-btn"><span class="end-square"></span>END</button>
                </NavLink>
            </div>
        )
    }
}

export default ActivePrac;