import React from 'react';
import AllMovesChart from './AllMovesChart';
import MoveTabs from './MoveTabs';

import './MoveInsights.css';
import data from './../../sample-data/moveHist';


class MoveInsights extends React.Component {
    constructor() {
        super();
        this.state = {
            tab: "1",
        }
        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(e) {
        this.setState({ tab: e.target.getAttribute("name") })
    }

    render() {
        return (
            <div>
                <MoveTabs changeTab={this.changeTab} tab={this.state.tab} />
                <div className="outline-box text-center p-5">
                    <p className="pb-3">Sync of up to last 50 move executions</p>
                    <AllMovesChart
                        data={data.find((move) => { return move.move === this.state.tab }).data.slice(-50)}
                    />
                </div>
            </div>
        )
    }
}

export default MoveInsights;