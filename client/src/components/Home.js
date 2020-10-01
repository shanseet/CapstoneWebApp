import React from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'
import HomeLineGraph from './HomeLineGraph';

class Home extends React.Component {
    constructor(props) {
        super();
        this.state = { totalPracs: "...", lastPrac: {}, isLoaded: false }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/pracs/counter')
            .then(response => {
                this.setState({ totalPracs: response.data });
                axios.get("http://localhost:4000/api/pracs/" + response.data)
                    .then(response2 => {
                        this.setState({ lastPrac: response2.data });
                        this.setState({ isLoaded: true });
                    })
                    .catch((err) => console.log(err));
            }).catch((err) => console.log(err));
    }

    render() {
        const dataStyle = {
            fontSize: "1.1rem",
            padding: "0.25rem 0"
        }

        return (
            <div>
                <p className="pt-3">Welcome back to Dance Dance Dashboard!</p>
                <div className="row mb-3">
                    <div className="col-md-6 p-0">
                        <div className="outline-box m-1 py-4 text-center">
                            <div>Last practice</div>
                            {this.state.isLoaded ?
                                <HomeLineGraph lastPrac={this.state.lastPrac} /> 
                                : <Spinner className="mt-3" animation="border" />
                            }
                        </div>
                    </div>
                    <div className="col-md-6 p-0">
                        <div className="outline-box m-1">
                            Graph 2
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 p-0">
                        <div className="outline-box m-1 py-2 text-center">
                            <div>Total recorded practices</div>
                            <div style={dataStyle}>{this.state.totalPracs}</div>
                        </div>
                    </div>
                    <div className="col-sm-4 p-0">
                        <div className="outline-box m-1 py-2 text-center">
                            <div>Group</div>
                            <div style={dataStyle}>B17</div>
                        </div>
                    </div>
                    <div className="col-sm-4 p-0">
                        <div className="outline-box m-1 py-2 text-center">
                            <div>Dancers</div>
                            <div style={dataStyle}>Foo, GW, JL, RM, Sai, SS</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;