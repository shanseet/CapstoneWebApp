import React from 'react';

function CustomizedAxisTick(props) {
    const { x, y, payload } = props;
    const date = new Date(payload.value).toLocaleString('en-GB', { hour12: true });
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={-5} y={2} dy={10} textAnchor="end" transform="rotate(-45)">
                {date === "Invalid Date" ? payload.value : date}
            </text>
        </g>
    )
}

export default CustomizedAxisTick;