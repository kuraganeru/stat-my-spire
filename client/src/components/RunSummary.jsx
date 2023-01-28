import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RunHeader from './RunHeader'

const RunSummary = props => {
    return (
        <Container id="run-summary-header">
            <Row>
                <Col>
                    <RunHeader formattedRun={props.formattedRun} />
                </Col>
            </Row>
        </Container>
    )
}

export default RunSummary