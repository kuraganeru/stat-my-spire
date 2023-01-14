/*
    Runs a reducer on an object of relics, which converts it into an array of relic objects.
    "key" refers to the value passed in with relicObj - will be an integer, either referring to the floor a relic was found OR a relic's stats, if it exists
*/
const formatRelicObjectToArray = (relicObj, key) => {
    return Object.entries(relicObj).reduce((totalValue, currentValue) => {
        return [
            ...totalValue,
            {
                relic_name: currentValue[0],
                [key]: currentValue[1]
            }
        ]
    }, [])
}

const formatAllRelicData = (relicFloors, relicStats) => {
    return relicFloors.map(relFloor => {
        const foundRelicWithStats = relicStats.find(relStat => relStat.relic_name === relFloor.relic_name)
        return {
            ...relFloor,
            floor_found: relFloor.floor_found,
            relic_stats: foundRelicWithStats ? foundRelicWithStats.relic_stats : null
        }
    })
}

const relicData = (data) => {
    const { relic_stats } = data

    // https://dev.to/darksmile92/js-use-spread-to-exclude-properties-1km9
    const { obtain_stats, counters, ...filterRelicStats } = relic_stats

    const relicStats = formatRelicObjectToArray(filterRelicStats, "relic_stats")
    const relicFloors = formatRelicObjectToArray(obtain_stats[0], "floor_found")

    // obtain_stats - some are integers, some are arrays
    // might change all ints to arrs
    // map
    const formattedRelicData = formatAllRelicData(relicFloors, relicStats)
    return formattedRelicData
}

export { relicData }