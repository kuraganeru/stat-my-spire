const relicData = (data) => {
	const {relics_obtained, relic_stats} = data

	/*
		relics_obtained: [{floor: x, key: relic}]
		relic_stats: {relic: x, relic2: y} -> [{relic_name: relic, relic_stat: x}]
	*/
	const {obtain_stats, counters, ...filterRelicStats} = relic_stats
	const relicReducer = (relicObj, key) => {
		return Object.entries(relicObj).reduce((total, current) => [...total, {relic_name: current[0], [key]: current[1]}],[])
	}
	const relicStats = relicReducer(filterRelicStats, "relic_stats")
	const relicFloors = relicReducer(obtain_stats[0], "floor_found")

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