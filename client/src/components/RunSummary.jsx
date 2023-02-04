import React from 'react'
import Container from 'react-bootstrap/Container';

import RunHeader from './RunHeader'

const RunSummary = props => {
    return (
        <Container id="run-summary-header">
            <RunHeader formattedRun={props.formattedRun} />
        </Container>
    )
}

export default RunSummary