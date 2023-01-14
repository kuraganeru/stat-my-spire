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

const relicData = (data) => {
	const {relics_obtained, relic_stats} = data

    const relicStats = formatRelicObjectToArray(filterRelicStats, "relic_stats")
    const relicFloors = formatRelicObjectToArray(obtain_stats[0], "floor_found")

	// obtain_stats - some are integers, some are arrays
	// might change all ints to arrs
	  // map
	const allRelicData = relicFloors.map(val => {
		const foundRelicWithStats = relicStats.find(x => x.relic_name === val.relic_name)
		return {
			...val,
			floor_found: val.floor_found,
			relic_stats: foundRelicWithStats ? foundRelicWithStats.relic_stats : null
		}
	})
	return allRelicData
}

export { relicData }