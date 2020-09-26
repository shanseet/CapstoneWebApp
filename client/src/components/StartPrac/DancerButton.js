import React from 'react';

function DancerButton(props) {
    const btnstyle = {
        color: "#FFF",
        opacity: props.isSelected ? "1.0" : "0.75",
        transform: props.isSelected ? "scale(1, 1.1)" : 'scale(1,1)',
    }

    return (
        <button className="btn dancer-btn" style={btnstyle} onClick={props.clickFunction} name={props.name}>
            {props.name}
        </button>
    )
}

export default DancerButton;