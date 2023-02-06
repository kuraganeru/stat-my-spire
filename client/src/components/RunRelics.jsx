import React, { Fragment } from 'react'

const RunRelics = props => {

    const generateRelicList = relics => {
        return relics.sort((a, b) => a.floor_found - b.floor_found).map((relic, index) => { //TODO: replace index with unique key from server response
            return (
                <div key={index}> 
                    <span>{relic.relic_name}: Floor {relic.floor_found} {relic.relic_stats && `Relic stats: ${relic.relic_stats}`}</span>
                </div>
            )
        })
    }
    return (
        <>
            <h4>Relics</h4>
            {generateRelicList(props.formattedRun.relics_obtained)}
        </>
    )
}

export default RunRelics