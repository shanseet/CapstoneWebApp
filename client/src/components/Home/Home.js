import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner'
import HomeLineGraph from './HomeLineGraph';
import SideNav from './SideNav';
import PracTable from './PracTable';
import API from '../../utils/API';

function Home() {
    const [pracData, setPracData] = useState([{}]);
    const [dataReturned, setDataReturned] = useState(false);
    const [chosenPrac, setChosenPrac] = useState("0");

    useEffect(() => {
        API.getAllPracs()
            .then(response => {
                setPracData(response.data);
                setChosenPrac(response.data.length.toString());
                setDataReturned(true);
            })
            .catch((err) => console.log(err));
    }, []);

    const deleteAllBtn = (
        <button type="button" className="btn btn-danger delete-all-btn" onClick={() => {
            if (window.confirm("Are you sure you want to delete all practices? This action is irreversible")) {
                API.deleteAllPracs();
                window.location.reload();
            }
        }}>
            DELETE ALL
        </button>
    )

    return (
        <div>
            { dataReturned ?
                pracData.length > 0 ?
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-3 split-home p-0">
                                <SideNav pracs={pracData} chosenPrac={chosenPrac} setChosenPrac={(id) => setChosenPrac(id)} />
                                {deleteAllBtn}
                            </div>
                            <div className="col-9 pl-md-4">
                                <HomeLineGraph prac={pracData[chosenPrac - 1]} />
                                <PracTable moves={pracData[chosenPrac - 1].moves} />
                            </div>
                        </div>
                    </div>
                    :
                    <div className="text-center">No practices recorded, you'd better start one right away!</div>
                :
                <div className="text-center">
                    <p>Welcome back, connect to the server to view your practices!</p>
                    <Spinner className="mt-3" animation="border" />
                </div>
            }


        </div>
    )
}

export default Home;