import React from 'react';

function MoveTabs(props) {
    const moves = ["elbowlock", "hair", "pushback", "rocket", "scarecrow",
        "shouldershrug", "windowwipe", "zigzag", "logout"];

    const tabs = moves.map((moveName) => {
        return (
            <div
                key={moveName}
                className="nav-item col"
                onClick={() => { props.changeTab(moveName) }}
                style={(moveName === props.tab) ? { color: "#BE4C8F", fontWeight: 600, borderBottom: "3px solid #BE4C8F" } : {}}
            >
                {moveName}
            </div>
        )
    });

    return (
        <ul className="row mx-0 nav side-nav text-center">
            {tabs}
        </ul>
    )
}

export default MoveTabs;