import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import HomeLineGraph from './HomeLineGraph';

import DateSelect from './DateSelect';
import SideNav from './SideNav';
import PracTable from './PracTable';
import Note from './Note';
import API from '../../utils/API';

function Home() {
    const [pracData, setPracData] = useState([{}]);
    const [dataReturned, setDataReturned] = useState(false);
    const [chosenPrac, setChosenPrac] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        API.getAllPracs()
            .then(response => {
                setPracData(response.data);
                if (response.data.length) {
                    setChosenPrac(response.data[response.data.length - 1]._id);
                }
                setDataReturned(true);
            })
            .catch((err) => console.log(err));
    }, []);

    const getPractices = () => {
        if (startDate && endDate) {
            setDataReturned(false);
            API.findInRange(startDate, endDate)
                .then(response => {
                    if (response.data.length) {
                        setChosenPrac(response.data[response.data.length - 1]._id);
                    }
                    setPracData(response.data);
                    setDataReturned(true);
                })
                .catch(err => console.log(err));
        } else {
            setStartDate();
            setEndDate();
            setDataReturned(false);
            API.getAllPracs()
                .then(response => {
                    if (response.data.length) {
                        setChosenPrac(response.data[response.data.length - 1]._id);
                    }
                    setPracData(response.data);
                    setDataReturned(true);
                })
                .catch((err) => console.log(err));
        }
    }

    const deleteAllBtn = (
        <button type="button" className="btn delete-all-btn" onClick={() => {
            if (window.confirm("Are you sure you want to delete all practices? This action is irreversible")) {
                API.deleteAllPracs();
                window.location.reload();
            }
        }}>
            DELETE ALL
        </button>
    )

    const deleteOneBtn = (
        <button type="button" className="btn" style={{ position: "absolute", right: 0 }} onClick={() => {
            if (window.confirm("Are you sure you want to delete this practice? This action is irreversible")) {
                API.deleteOnePrac(chosenPrac);
                window.location.reload();
            }
        }}>
            <i className="fa fa-trash" style={{ color: "#f04968" }}></i>
        </button>
    )

    return (
        <div className="container-fluid">
            <div className="row">
                <DateSelect
                    start={startDate} setStart={(val) => setStartDate(val)}
                    end={endDate} setEnd={(val) => setEndDate(val)}
                    handleFilter={() => getPractices()}
                />
            </div>
            { dataReturned ?
                pracData.length > 0 ?
                    <div>
                        <div className="row">
                            <div className="col-3 p-0">
                                <SideNav pracs={pracData} chosenPrac={chosenPrac} setChosenPrac={(id) => setChosenPrac(id)} />
                                {deleteAllBtn}
                                <br/>
                            </div>
                            <div className="col-9 pl-md-4">
                                {deleteOneBtn}
                                <HomeLineGraph prac={pracData.find(prac => prac._id === chosenPrac)} />
                                <PracTable moves={pracData.find(prac => prac._id === chosenPrac).moves} />
                                <Note
                                    content={pracData.find(prac => prac._id === chosenPrac).notes}
                                    id={chosenPrac}
                                    editNote={() => getPractices()}
                                />
                            </div>
                        </div>
                    </div>
                    :
                    <div className="text-center">No practices recorded, you'd better start one right away!</div>
                :
                <div className="text-center">
                    <Spinner className="mt-3" animation="border" />
                </div>
            }


        </div>
    )
}

export default Home;