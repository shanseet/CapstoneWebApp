import React from 'react';
import API from '../../utils/API';
import Spinner from 'react-bootstrap/Spinner'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import PracTable from './PracTable';
import './PracHist.css';

class PracHist extends React.Component {
    constructor(props) {
        super();
        this.state = { pracData: [{}], dataIsReturned: false };
    }

    componentDidMount() {
        API.getAllPracs()
            .then(response => {
                this.setState({ pracData: response.data });
                this.setState({ dataIsReturned: true });
            }).catch((err) => console.log(err));
    }

    render() {
        if (!this.state.dataIsReturned) {
            return (
                <div className="text-center pt-5">
                    <Spinner animation="border" />
                </div>
            )
        } else {
            let accs = this.state.pracData.map((prac) => {
                let startDate = new Date(prac.start);

                return (
                    <Card key={prac._id} className="prac-hist">
                        <Accordion.Toggle as={Card.Header} eventKey={prac._id}>
                            {startDate.toLocaleString()}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={prac._id}>
                            <Card.Body>
                                <PracTable moves={prac.moves} start={startDate} />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                )
            }).reverse();

            return (
                <div>
                    <button type="button" className="btn btn-danger delete-all-btn" onClick={() => {
                        if (window.confirm("Are you sure you want to delete all practices? This action is irreversible")) {
                            API.deleteAllPracs();
                            window.location.reload();
                        }}}
                    >
                        DELETE ALL
                    </button>
                    <Accordion defaultActiveKey={this.state.pracData.length.toString()}>
                        {accs}
                    </Accordion>
                </div>
            )
        }
    }
}

export default PracHist;