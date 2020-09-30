import React from 'react';
import Table from 'react-bootstrap/Table';
import infoIcon from '../../assets/info-icon.svg';
import idToDancer from '../../constants/idToDancer';
import idToMove from '../../constants/idToMove';

function PracTable(props) {
    let dancers = props.dancers.map((dancer) => {
        return <span key={dancer}>{idToDancer[dancer]} </span>
    });

    let rows = props.moves.map((action) => {
        let sync, bg, positions, indivLag;
        sync = bg = positions = indivLag = "";

        if (props.dancers.length > 1) {
            let totalLag = 0;
            for (let i = 0; i < props.dancers.length; i++) {
                totalLag += Math.max(0, action.lag[i].lag - 200);
                indivLag += idToDancer[action.lag[i].d_id] + ": " + action.lag[i].lag;
                if (i < props.dancers.length - 1) indivLag += ", ";
            }
            sync = Math.max(0, (100 - 100 * totalLag / ((props.dancers.length - 1) * 800))).toFixed(1);
            bg = <div className="red-bg"><div className="green-bg" style={{ opacity: `${sync / 100}` }}></div></div>;
            action.position.forEach(dancer => {
                positions += idToDancer[dancer] + " ";
            })
        }

        let actionDate = new Date(action.time);
        let diffMs = actionDate.getTime() - props.start.getTime();
        let diffMins = Math.round(diffMs / 60000);

        return (
            <tr key={action.time}>
                <td>{diffMins}:{('0' + diffMs / 1000).slice(-2)}</td>
                <td>{idToMove[action.move]}</td>
                <td>{positions ? positions : "-"}</td>
                <td>{indivLag ? indivLag : "-"}</td>
                <td style={{ position: "relative" }}>
                    {bg ? bg : ""}
                    {sync ? sync + "%" : "-"}
                </td>
            </tr>
        )
    });

    return (
        <div>
            <p style={{ fontSize: "0.9rem" }}>Dancer(s): {dancers}</p>
            <Table bordered size="sm">
                <thead>
                    <tr>
                        <th width="8%">At</th>
                        <th width="15%">Move</th>
                        <th width="21%">Positions</th>
                        <th width="38%">Time lag</th>
                        <th width="18%" className="info-icon">
                            Sync <img src={infoIcon} alt="info" />
                            <span className="show-info">This tooltip will show the formula</span>
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