import React from 'react';

function StartQns(props) {
    const qnStyle = {
        paddingTop: "4rem",
        fontSize: "1.75rem"
    }

    return (
        <div className="text-center">
            <p style={qnStyle}>All dancers ready?</p>

            <button className="btn start-btn" onClick={props.handleStart}>START</button>
        </div>
    )
}

export default StartQns;