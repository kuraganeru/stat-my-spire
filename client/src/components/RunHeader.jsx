import React, { Fragment } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RunHeader = props => {

    const formatWinLossResult = (didWin, floorList) => {
        if (didWin) {
            return "Victory!"
        } else {
            const endingFloor = floorList[floorList.length - 1]
            return `Slain on Floor ${endingFloor.floor} by ${endingFloor.enemies}`
        }
    }

    const renderRunHeader = (formattedRun) => {
        if (!formattedRun || Object.keys(formattedRun).length <= 0) {
            return null
        }
        return (
            <>
                <Col>
                    <h2>{formattedRun.character}</h2>
                    <h3 className={formattedRun.victory ? "text-success" : "text-danger"}>{formatWinLossResult(formattedRun.victory, formattedRun.run_nodes)}</h3>
                    <h4>Ascension Level {formattedRun.ascension_level}</h4>
                </Col>
                <Col className="text-end">
                    <h5>Seed: {formattedRun.seed}</h5>
                    <h5>Run time: {formattedRun.run_time}</h5>
                </Col>
            </>
        )
    }

    return (
        <Row className="bg-light border rounded p-3">
            {renderRunHeader(props.formattedRun)}
        </Row>
    )
}

export default RunHeader