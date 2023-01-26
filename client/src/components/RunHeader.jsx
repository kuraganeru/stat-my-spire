import React, { Fragment } from 'react'

const RunHeader = props => {

    const renderFormattedRun = (formattedRun) => {
        if (!props.formattedRun) {
            return null
        }
        return (
            <>
                <h2>{formattedRun.character}</h2>
                <h3>Ascension Level {formattedRun.ascension_level}</h3>
            </>
        )
    }

    return (
        <div>
            {renderFormattedRun(props.formattedRun)}
        </div>
    )
}

export default RunHeader