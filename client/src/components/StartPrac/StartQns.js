import React from 'react';
import DancerButton from './DancerButton';
import dancerIcon from '../../assets/dance-icon.svg';

function StartQns(props) {
    const qnStyle = {
        paddingTop: "4rem",
        fontSize: "1.75rem"
    }

    const dancer = <img src={dancerIcon} alt="dancer" width="40" height="40" />;

    let dancers;

    if (props.numDancers === 3) {
        dancers = <div> {dancer} {dancer} {dancer} </div>
    } else if (props.numDancers === 2) {
        dancers = <div> {dancer} {dancer} </div>
    } else {
        dancers = <div> {dancer} </div>
    }

    return (
        <div className="text-center">
            <p style={qnStyle}>How many dancers are at practice?</p>
            {dancers}

            <DancerButton
                clickFunction={props.setDancers}
                name="1"
                isSelected={props.numDancers === 1}
            />
            <DancerButton
                clickFunction={props.setDancers}
                name="2"
                isSelected={props.numDancers === 2}

            />
            <DancerButton
                clickFunction={props.setDancers}
                name="3"
                isSelected={props.numDancers === 3}
            />

            <p style={qnStyle}>All dancers ready?</p>

            <button className="btn start-btn" onClick={props.handleStart}>START</button>
        </div>
    )
}

export default StartQns;