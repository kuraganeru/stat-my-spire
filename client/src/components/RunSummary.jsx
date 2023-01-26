import React from 'react'

import RunHeader from './RunHeader'

const RunSummary = props => {
    return (
        <div>
            <RunHeader formattedRun={props.formattedRun} />
        </div>
    )
}

export default RunSummary