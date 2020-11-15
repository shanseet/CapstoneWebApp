import React, { useState, useEffect } from 'react';
import ActivePrac from './ActivePrac';
import API from '../../utils/API';

function StartPrac() {
    const [hasStarted, setStarted] = useState(false);
    const [iStarted, didIStart] = useState(false); //will push to database only if true
    const [dbConnected, setDbConnected] = useState(false);
    const [mqttConnected, setMqttConnected] = useState(false);

    useEffect(() => {
        API.isActive()
            .then(response => {
                setDbConnected(true);
                if (response.data === 1) setStarted(true);
            })
            .catch(err => {
                console.log(err.resposne);
            });
    }, [])

    return (
        <div className="text-center" style={{ position: "relative" }}>
            <div style={{ position: "absolute", right: "0.3rem", top: "2rem", fontWeight: 300 }}>
                database {dbConnected ?
                    <i className="fa fa-check-circle" style={{ color: "green" }}></i>
                    :
                    <i className="fa fa-times-circle" style={{ color: "red" }}></i>
                } &nbsp; &nbsp;
                mqtt {mqttConnected ?
                    <i className="fa fa-check-circle" style={{ color: "green" }}></i>
                    :
                    <i className="fa fa-times-circle" style={{ color: "red" }}></i>}
            </div>

            <ActivePrac
                handleStop={() => { if (dbConnected) API.setActive(0) }}
                sendData={(newPrac) => { if (dbConnected) API.addPrac(newPrac) }}
                iStarted={iStarted}
                setMqttConnected={(val) => setMqttConnected(val)}
                hasStarted={hasStarted}
                handleStart={() => {
                    setStarted(true);
                    didIStart(true);
                    API.setActive(1);
                }}
            />
        </div>
    )
}

export default StartPrac;