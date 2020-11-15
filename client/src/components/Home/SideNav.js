import React from 'react';


function SideNav(props) {
    let tabs = props.pracs.map(prac => {
        let startDate = new Date(prac.start);
        return (
            <div
                key={prac._id}
                className="nav-item pl-md-4 pl-3 pr-2"
                onClick={() => { props.setChosenPrac(prac._id) }}
                style={(props.chosenPrac === prac._id) ? { backgroundColor: "#41547F", color: "#FAFAFA" } : {}}
            >
                {startDate.toLocaleDateString('en-GB') + ", " + startDate.toLocaleTimeString()}
            </div>
        )
    }).reverse();

    return (
        <div className="nav side-nav flex-column">
            {tabs}
        </div>
    )
}

export default SideNav;