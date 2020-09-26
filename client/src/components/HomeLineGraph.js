import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import CustomizedAxisTick from './CustomizedAxisTick';

import idToDancer from '../constants/idToDancer';
import idToMove from '../constants/idToMove';

function HomeLineGraph(props) {
    let graphs = [];
    let lastPrac = props.lastPrac;
    lastPrac.moves.forEach((action) => {
        let graph = {};
        graph.move = idToMove[action.move];
        if (lastPrac.dancers.length > 1) {
            lastPrac.dancers.forEach((dancer) => {
                graph[idToDancer[dancer]] = action.lag.find(d => d.d_id === dancer).lag;
            })
        }
        graphs.push(graph);
    });

    const lineColors = ["#FFA21C", "#BE4C8F", "#41547F"];

    const tooltipStyle = {
        color: '#021F2D',
        backgroundColor: "#FAFAFA",
        border: "none",
        fontSize: "0.75rem",
        textAlign: "left",
        borderRadius: "4px"
    };

    let lines = lastPrac.dancers.map((dancer, index) => {
        return (
            <Line
                type="monotone"
                dataKey={idToDancer[dancer]}
                key={dancer}
                stroke={lineColors[index]}
                strokeWidth="1.5"
            />
        )
    })

    return (
        <div>
            <small className="text-muted">{lastPrac.date} {lastPrac.time}</small>
            <ResponsiveContainer width="85%" height={300}>
                <LineChart data={graphs}>
                    <CartesianGrid stroke="rgba(112,112,112,0.2)" strokeDasharray="3 3" />
                    {lines}
                    <XAxis
                        dataKey="move"
                        tick={<CustomizedAxisTick />}
                        interval={0}
                        height={50}
                        minTickGap={1}
                        label={{ value: 'Move', position: 'insideTopRight', offset: 5 }}
                    />
                    <YAxis
                        label={{ value: 'Time lag (ms)', angle: -90, position: 'insideLeft' }}
                    // type="number"
                    />
                    <Legend verticalAlign="top" align="right" height={36} />
                    <Tooltip contentStyle={tooltipStyle} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default HomeLineGraph;