import React, {Fragment} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RunNeowBonuses from './RunNeowBonuses';
import RunRelics from './RunRelics';

const RunSubheader = props => {

    return (
        <Row className="bg-light border rounded p-3">
            <Col>
                <RunNeowBonuses />
            </Col>
            <Col>
                <RunRelics />
            </Col>
        </Row>
    )
}

export default RunSubheader