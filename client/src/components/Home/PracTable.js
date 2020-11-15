import React from 'react';
import Table from 'react-bootstrap/Table';
import infoIcon from '../../assets/info-icon.svg';
import idToDancer from '../../constants/idToDancer';

function PracTable(props) {
    let rows = props.moves.map((action) => {
        let bg, positions, indivLag;
        bg = positions = indivLag = "";

        for (let i = 0; i < action.position.length; i++) {
            indivLag += idToDancer[action.position[i]] + ": " + action.lag[i];
            if (i < action.position.length - 1) indivLag += ", ";
        }
        action.position.forEach(dancer => {
            positions += idToDancer[dancer] + " ";
        })
        bg = <div className="green-bg"><div className="red-bg" style={{ opacity: `${action.sync / 2000}` }}></div></div>;

        let actionDate = new Date(action.time).toLocaleTimeString();

        return (
            <tr key={action.time}>
                <td>{actionDate}</td>
                <td>{action.move}</td>
                <td>{positions ? positions : "-"}</td>
                <td>{indivLag ? indivLag : "-"}</td>
                <td style={{ position: "relative" }}>
                    {action.position.length > 1 ? <>{bg} {action.sync.toFixed(2)}</> : "-"}
                </td>
            </tr>
        )
    });

    return (
        <div>
            <Table size="sm" responsive="md">
                <thead>
                    <tr>
                        <th width="14%">At</th>
                        <th width="16%">Move</th>
                        <th width="16%">Positions</th>
                        <th width="34%">Delay (ms)</th>
                        <th width="20%" className="info-icon">
                            Avg Delay (ms) <img src={infoIcon} alt="info" />
                            <span className="show-info">Sum of delays / (num of dancers - 1)</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </div>
    )
}

export default PracTable;