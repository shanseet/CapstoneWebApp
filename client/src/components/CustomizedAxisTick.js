import React from 'react';

function CustomizedAxisTick(props) {
    const { x, y, payload } = props;
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={-5} y={2} dy={10} textAnchor="end" transform="rotate(-45)">
                {payload.value}
            </text>
        </g>
    )
}

export default CustomizedAxisTick;