import React from 'react'
import Container from 'react-bootstrap/Container';

import RunHeader from './RunHeader'
import RunSubheader from './RunSubheader';

const RunSummary = props => {
    return (
        <Container id="run-summary-header">
            <RunHeader formattedRun={props.formattedRun} />
            <RunSubheader formattedRun={props.formattedRun} />
        </Container>
    )
}

export default RunSummary