import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import CustomizedAxisTick from '../CustomizedAxisTick';
function AllMovesChart(props) {

    const tooltipStyle = {
        color: '#021F2D',
        backgroundColor: "#FAFAFA",
        border: "none",
        fontSize: "0.9rem",
        textAlign: "left",
        borderRadius: "4px"
    };

    const formatTooltip = (value, name) => { return [`${value}ms`, "delay"] };

    return (
        <div>
            <p><small className="text-muted">{props.tab}</small></p>
            <ResponsiveContainer width="85%" height={350}>
                <LineChart data={props.data}>
                    <CartesianGrid stroke="rgba(112,112,112,0.2)" strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="sync" stroke="#BE4C8F" strokeWidth="1.5" />
                    <XAxis
                        dataKey="time"
                        tick={<CustomizedAxisTick />}
                        interval={0}
                        height={95}
                        minTickGap={1}
                        label={{ value: 'Time', position: 'insideTopRight', offset: 5 }}
                    />
                    <YAxis
                        label={{ value: 'Avg delay (ms)', angle: -90, position: 'insideLeft' }}
                        type="number"
                        width={80}
                    />
                    <Tooltip
                        contentStyle={tooltipStyle}
                        formatter={formatTooltip}
                        labelFormatter={function (value) { return `${new Date(value).toLocaleString()}`; }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AllMovesChart;