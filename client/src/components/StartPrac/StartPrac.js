import React, { useState, useEffect } from 'react';
import StartQns from './StartQns';
import ActivePrac from './ActivePrac';
import API from '../../utils/API';

function StartPrac() {
    const [hasStarted, setStarted] = useState(false);
    const [isConnected, setConnected] = useState(false);

    useEffect(() => {
        API.isActive()
            .then(response => {
                setConnected(true);
                if (response.data === 1) setStarted(true);
            })
            .catch(err => {
                console.log(err.resposne);
            });
    }, [])

    return (
        <div className="text-center" style={{ position: "relative" }}>
            <div style={{ position: "absolute", right: "0", top: "15px", fontSize: "0.8em" }}>
                {isConnected ? "connected! data will be stored" : "offline :( connect to store data"}
            </div>

            {hasStarted ?
                <ActivePrac
                    handleStop={() => { if (isConnected) API.setActive(0) }} 
                    sendData = {(newPrac) => { if (isConnected) API.addPrac(newPrac)}}
                />
                :
                <StartQns handleStart={() => {
                    setStarted(true);
                    API.setActive(1);
                }} />
            }
        </div>
    )
}

export default StartPrac;