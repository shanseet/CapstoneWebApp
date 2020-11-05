import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import AllMovesChart from './AllMovesChart';
import MoveTabs from './MoveTabs';
import API from '../../utils/API';

import './MoveInsights.css';

function MoveInsights() {
    const [pracData, setPracData] = useState([{}]);
    const [tab, changeTab] = useState("elbowlock");
    const [dataReturned, setDataReturned] = useState(false);
    const [moveData, setMoveData] = useState([]);

    useEffect(() => {
        API.getAllPracs()
            .then(response => {
                setPracData(response.data);
                setDataReturned(true);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setMoveData([]);
        if (dataReturned) {
            pracData.forEach(prac => {
                setMoveData(md => md.concat(prac.moves.filter(move => {
                    return move.move === tab;
                })))
            })
        }
    }, [tab, dataReturned, pracData]);


    return (
        <div className="container-fluid">
            <MoveTabs changeTab={(tab) => changeTab(tab)} tab={tab} />
            <div className="row">
                <div className="col-md-9">
                    <div className="outline-box text-center py-5 px-3">
                        {moveData.length ?
                            <AllMovesChart tab={tab} data={moveData} />
                            :
                            dataReturned ?
                                "No history for this move yet!"
                                : <Spinner className="mt-3" animation="border" />
                        }

                    </div>
                </div>
                <div className="col-md-3">
                    <img src={require(`../../assets/gifs/${tab}.gif`)} alt="movement gif" width="100%" />
                </div>
            </div>
        </div>
    )
}

export default MoveInsights;