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
                let hm = ('0' + startDate.getHours()).slice(-2) + ":" + ('0' + startDate.getMinutes()).slice(-2);

                return (
                    <Card key={prac._id} className="prac-hist">
                        <Accordion.Toggle as={Card.Header} eventKey={prac._id}>
                            {startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear() + " " + hm}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={prac._id}>
                            <Card.Body>
                                <PracTable moves={prac.moves} dancers={prac.dancers} start={startDate} />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                )
            }).reverse();

            return (
                <div>
                    <Accordion defaultActiveKey={this.state.pracData.length.toString()}>
                        {accs}
                    </Accordion>
                </div>
            )
        }
    }
}

export default PracHist;