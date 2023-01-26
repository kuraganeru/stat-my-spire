import React from 'react'

const RunSummary = props => {
    return (
        <div>
            <h2>{props.formattedRun ? props.formattedRun.character : null}</h2>
        </div>
    )
}

export default RunSummary