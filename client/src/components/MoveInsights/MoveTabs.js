import React from 'react';

function MoveTabs(props) {
    const moves = ["1", "2", "3"];

    const pills = moves.map((move) => {
        return (
            <li className="nav-item" key={move}>
                <span
                    className={`nav-link ${(props.tab === move && "active")}`}
                    onClick={(e) => { props.changeTab(e) }}
                    name={move}
                >
                    Move {move}
                </span>
            </li>
        )
    });

    return (
        <ul className="nav nav-pills nav-fill mb-3">
            {pills}
        </ul>
    )
}

export default MoveTabs;