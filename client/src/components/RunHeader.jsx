import React, { Fragment } from 'react'

const RunHeader = props => {

    const formatWinLossResult = (didWin, floorList) => {
        if (didWin) {
            return "Victory!"
        } else {
            const endingFloor = floorList[floorList.length - 1]
            return `Slain on Floor ${endingFloor.floor} by ${endingFloor.enemies}`
        }
    }

    const renderFormattedRun = (formattedRun) => {
        if (!formattedRun || Object.keys(formattedRun).length <= 0) {
            return null
        }
        return (
            <>
                <h2>{formattedRun.character}</h2>
                <h3>{formatWinLossResult(formattedRun.victory, formattedRun.run_nodes)}</h3>
                <h4>Ascension Level {formattedRun.ascension_level}</h4>
            </>
        )
    }

    return (
        <>
            {renderFormattedRun(props.formattedRun)}
        </>
    )
}

export default RunHeader