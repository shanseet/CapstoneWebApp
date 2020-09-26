import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import CustomizedAxisTick from '../CustomizedAxisTick';

// import './MoveInsights.css'

function AllMovesChart(props) {

    const tooltipStyle = {
        color: '#021F2D',
        backgroundColor: "#FAFAFA",
        border: "none",
        fontSize: "0.9rem",
        textAlign: "left",
        borderRadius: "4px"
    };

    const formatTooltip = value => `${value}%`;

    return (
        <ResponsiveContainer width="85%" height={300}>
            <LineChart data={props.data}>
                <CartesianGrid stroke="rgba(112,112,112,0.2)" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="sync" stroke="#BE4C8F" strokeWidth="1.5" />
                <XAxis
                    dataKey="prac"
                    tick={<CustomizedAxisTick />}
                    interval={0}
                    height={50}
                    minTickGap={1}
                    label={{ value: 'Practice date & time', position: 'insideTopRight', offset: 5}}
                />
                <YAxis
                    unit="%"
                    label={{ value: 'Sync', angle: -90, position: 'insideLeft' }}
                    type="number"
                    domain={[0, 100]} 
                />
                <Tooltip contentStyle={tooltipStyle} formatter={formatTooltip} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default AllMovesChart;