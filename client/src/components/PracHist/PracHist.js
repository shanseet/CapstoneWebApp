import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import PracTable from './PracTable';
import './PracHist.css';

import data from './../../sample-data/pracHistData';

function PracHist() {
    let accs = data.map((prac) => {
        return (
            <Card key={prac.id} className="prac-hist">
                <Accordion.Toggle as={Card.Header} eventKey={prac.id}>
                    {prac.date} {prac.time}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={prac.id}>
                    <Card.Body>
                        <PracTable moves={prac.moves} dancers={prac.dancers} />
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    });

    return (
        <div>
            <Accordion defaultActiveKey={data.length}>
                {accs}
            </Accordion>
        </div>
    )
}

export default PracHist;