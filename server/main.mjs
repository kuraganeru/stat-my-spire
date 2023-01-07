import express from 'express'
import multer from 'multer'
import cors from "cors"
import * as fs from 'fs'
import path from 'path'
import { readFile } from 'fs/promises';

// just testing branching...for use when switching PCs

// express
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// multer
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '.json')
	}
})
const upload = multer({ storage: storage })

// cardnames: {}
// silent: [{old, new}, {old, new}]?
const cardNames = [
	{ oldName: "AscendersBane", newName: "Ascender's Bane" },
	{ oldName: "Strike_G", newName: "Strike", upgradedNewName: "Strike+1", character: "Silent" },
	{ oldName: "Strike_R", newName: "Strike", upgradedNewName: "Strike+1", character: "Ironclad" },
	{ oldName: "Strike_B", newName: "Strike", upgradedNewName: "Strike+1", character: "Defect" },
	{ oldName: "Strike_P", newName: "Strike", upgradedNewName: "Strike+1", character: "Watcher" },
	{ oldName: "Defend_G", newName: "Defend", upgradedNewName: "Defend+1", character: "Silent" },
	{ oldName: "Defend_R", newName: "Defend", upgradedNewName: "Defend+1", character: "Ironclad" },
	{ oldName: "Defend_B", newName: "Defend", upgradedNewName: "Defend+1", character: "Defect" },
	{ oldName: "Defend_P", newName: "Defend", upgradedNewName: "Defend+1", character: "Watcher" },
	{ oldName: "Night Terror", newName: "Nightmare", upgradedNewName: "Nightmare+1", character: "Silent" },
	{ oldName: "PiercingWail", newName: "Piercing Wail", upgradedNewName: "Piercing Wail+1", character: "Silent" },
	{ oldName: "Wraith Form v2", newName: "Wraith Form", upgradedNewName: "Wraith Form+1", character: "Silent" },
	{ oldName: "Underhanded Strike", newName: "Sneaky Strike", upgradedNewName: "Sneaky Strike+1", character: "Silent" },
	{ oldName: "Undo", newName: "Equilibrium", upgradedNewName: "Equilibrium+1", character: "Defect" },
	{ oldName: "Redo", newName: "Recursion", upgradedNewName: "Recursion+1", character: "Defect" },
]

// card functions
const masterDeck = (arr) => {
	const masterDeckObj = arr.reduce((accum, curr) => { 		// runs a reduce to turn the master deck into an array of objects
		return {
			...accum,
			[curr]: (accum[curr] || 0) + 1
		}
	}, {})

	const updateCardNames = (arr) => {
		const cards = arr.map((val) => {
			const findOutdatedCards = cardNames.find(c => c.oldName === val.baseCardName)
			const upgradeInt = parseInt(val.card_upgrade, 10)
			return findOutdatedCards ? {
				...val,
				base_card_name: findOutdatedCards.newName,
				card_name: upgradeInt === 1 ? `${findOutdatedCards.newName}+1` : findOutdatedCards.newName,
				card_upgrade: upgradeInt
			} : { ...val, card_upgrade: upgradeInt };
		})
		return cards
	}

	const cardDataObj = Object.entries(masterDeckObj).map(([name, copies]) => {
		const slicedName = name.slice(-3)		// gets the last 3 characters of the card name:
		const plusIdx = slicedName.indexOf('+')		// random characters = unupgraded card; [char]+1 = upgraded card; +[num] = card upgraded multiple times, ie. ironclad's searing blow, downfall guardian's refracted beam
		const charAfterPlusNaN = !Number.isNaN(parseInt(slicedName.charAt(plusIdx + 1)))		// converts the character after the plus to a number, and checks if the character is NOT NaN, meaning it checks if it is a valid number. 
		// console.log(`${name}: ${charAfterPlusNaN}. ${charAfterPlusNaN ? 'upgraded' : 'NOT unupgraded'}`) 		// valid number (should) mean upgraded card
		const isUpgradedCard = plusIdx > -1 && charAfterPlusNaN
		return {
			base_card_name: isUpgradedCard ? name.slice(0, name.indexOf('+')) : name,
			card_name: name,
			copies: copies,
			card_upgrade: isUpgradedCard ? slicedName.slice(plusIdx + 1) : 0
		}
	})
	return updateCardNames(cardDataObj)
}

// floors / pathing
const runPathing = (data) => {
	const { path_per_floor, path_taken, current_hp_per_floor, gold_per_floor } = data

	const formattedPathPerFloor = path_per_floor.map(val => {
		if (val === null) {
			return "AB"
		}
		if (val === "B") {
			return "BOSS"
		}
		return val
	})

	const formatPathTakenFn = (arr) => {
		let path = [...arr]
		for (let i = path.length - 1; i >= 0; i--) {
			if (path[i] === "BOSS" && path[i + 1] != "BOSS") {
				path.splice(i + 1, 0, "AB")
			}
		}
		return path;
	}
	const formattedPathTaken = formatPathTakenFn(path_taken)

	const checkPathFloorTakenAreEqual = (formattedPathPerFloor.length === formattedPathTaken.length) && formattedPathPerFloor.every(val => formattedPathTaken.includes(val)) // use to error check

	const floorData = formattedPathTaken.map((val, index) => {
		const floorTypes = [
			{ orig_name: "M", new_name: "Monster" },
			{ orig_name: "?", new_name: "Question Mark" },
			{ orig_name: "$", new_name: "Shop" },
			{ orig_name: "E", new_name: "Elite" },
			{ orig_name: "BOSS", new_name: "Boss" },
			{ orig_name: "R", new_name: "Rest Site" },
			{ orig_name: "T", new_name: "Treasure" },
			{ orig_name: "AB", new_name: "After Boss" },
			{ orig_name: "QEV", new_name: "Event" },
			{ orig_name: "QM", new_name: "Unknown / Monster" },
			{ orig_name: "Q$", new_name: "Unknown / Shop" },
			{ orig_name: "QT", new_name: "Unknown / Treasure" }]

		// compare path_taken vs floor
		const compareTakenFloorPaths = (taken, floor) => {
			if (taken !== "?") {
				return val
			}

			if (floor === "?") {
				return "QEV"
			}

			if (floor === "M") {
				return "QM"
			}

			if (floor === "$") {
				return "Q$"
			}

			if (floor === "T") {
				return "QT"
			}
		}
		const comparePathsResult = compareTakenFloorPaths(val, formattedPathPerFloor[index])
		const formattedType = floorTypes.find(obj => obj.orig_name === comparePathsResult)

		return {
			orig_type: formattedType.orig_name,
			type: formattedType.new_name,
			floor: index + 1,
			current_hp: current_hp_per_floor[index],
			current_gold: gold_per_floor[index]
		}
	})

	const returnNodes = () => {
		return floorData.map(val => {
			switch (val.orig_type) {
				case "M":
				case "QM":
				case "E":
				case "BOSS":
					const {damage_taken, card_choices, potions_obtained} = data
					const fightData = damage_taken.find(m => m.floor === val.floor)
					const cardData = card_choices.find(c => c.floor === val.floor)
					const potionData = potions_obtained.find(p => p.floor === val.floor)
					// add relic data for elites
					const relicData = data.relics_obtained.find(r => r.floor === val.floor)
					return {
						...val,
						enemies: fightData.enemies,
						damage: fightData.damage,
						turns: fightData.turns,
						card_picked: cardData ? cardData.picked : null,
						card_not_picked: cardData ? cardData.not_picked : null,
						potion_found: potionData ? potionData.key : null,
						relic_found: relicData ? relicData.key : null
					}
				case "R":
					const {campfire_choices} = data
					const restData = campfire_choices.find(camp => camp.floor === val.floor)
					return {
						...val,
						action: restData.key,
						upgraded_card: restData.key === "SMITH" ? restData.data : null
					}
				case "$":
				case "Q$":
					const {item_purchase_floors, items_purchased, items_purged_floors, items_purged} = data
					const shopPurchases = item_purchase_floors.map((shopFloor, index) => ({ floor: shopFloor, purchase: items_purchased[index] }))
					const purchasesPerFloor = shopPurchases.filter(sp => sp.floor === val.floor)

					// combine removal + floor, and find the removal
					const shopRemovals = items_purged_floors.map((shopFloor, index) => ({ floor: shopFloor, removal: items_purged[index] }))
					const removal = shopRemovals.find(rm => rm.floor === val.floor)

					return {
						...val,
						purchases: purchasesPerFloor.map(item => item.purchase),
						card_removal_choice: removal ? removal.removal : null
					}
				case "T":
				case "QT":
					const { blue_key_relic_skipped_log: blue_key_log } = data;
					const treasureData = data.relics_obtained.find(treasureFloor => treasureFloor.floor === val.floor)
					return {
						...val,
						skipped_relic: !Boolean(treasureData),
						found_relic: treasureData ? treasureData.key : `Skipped ${blue_key_log ? blue_key_log.relicID : "unavailable"} for Blue Key (Skipped relic not available for old runs)`
					}
				case "QEV":
					const {event_choices} = data
					const eventData = event_choices.find(eventFloor => eventFloor.floor === val.floor)
					return {
						...val,
						...eventData
					}
				case "AB":
					const {boss_relics} = data
					const obtainStats = data.relic_stats.obtain_stats[0]
					const reduceObtainStatsToArr = Object.entries(obtainStats).reduce((total, current) => {
						return [
							...total,
							{
								relic_name: current[0],
								floor_obtained: current[1]
							}
						]
					}, [])
					const foundBossRelics = reduceObtainStatsToArr.find(b => b.floor_obtained === val.floor)
					const skippedRelics = foundBossRelics && boss_relics.find(g => g.picked === foundBossRelics.relic_name)
					return {
						...val, 
						boss_picked_relic: foundBossRelics ? foundBossRelics.relic_name : null,
						boss_skipped_relic: skippedRelics ? skippedRelics.not_picked : null 
					}
			}
		})
	}

	return returnNodes()
}

const runInfo = (runData) => {
	const {victory, ascension_level, floor_reached, playtime, score, score_breakdown, seed_played, character_chosen} = runData

	const formatSecondsToHours = seconds => {
		let date = new Date()
		date.setSeconds(seconds)
		return date.toISOString().substr(11, 8)
	}
	return {
		ascension_level,
		floor_reached,
		victory: victory,
		run_time: formatSecondsToHours(playtime),
		score,
		score_breakdown,
		seed: seed_played,
		character: character_chosen
	}
}

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
	  const allRelicData = relicStats.map(val => {
		const foundRelic = relicFloors.find(x => x.relic_name === val.relic_name)
		return {
			...val,
			floor_found: foundRelic && foundRelic.floor_found
		}
	  })
	return allRelicData
}

const formatRunData = rawRunData => {
	const rawRunDataJSON = JSON.parse(rawRunData)
	const formatDeck = masterDeck(rawRunDataJSON.master_deck)
	const formatRunHistory = runPathing(rawRunDataJSON)
	const formatRunInfo = runInfo(rawRunDataJSON)
	const formatRelicList = relicData(rawRunDataJSON)
	return {
		...formatRunInfo,
		run_nodes: formatRunHistory,
		final_deck: formatDeck,
		relics_obtained: formatRelicList
	}
}

// routes
app.get("/run", async (req, res) => { // currently hardcoded while scaffolding frontend
	const sampleRunData = JSON.parse(
		await readFile(new URL('./uploads/silent_formatted.json', import.meta.url))
	)
	res.json(sampleRunData)
})

app.post("/upload", async (req, res) => {
	const rawRunData = fs.readFileSync('uploads/silent.json')
	const rawRunDataJSON = JSON.parse(rawRunData)
	const formatDeck = masterDeck(rawRunDataJSON.master_deck)
	const formatRunHistory = runPathing(rawRunDataJSON)
	const formatRunInfo = runInfo(rawRunDataJSON)
	const formatRelicList = relicData(rawRunDataJSON)
	const runNodes = {
		...formatRunInfo,
		run_nodes: formatRunHistory,
		final_deck: formatDeck,
		relics_obtained: formatRelicList
	}
	res.json(runNodes)
})

app.post("/upload_files", upload.single("runData"), (req, res) => {
	// multer upload.single(<str>) must match formData.append(<str>) on front-end formData creation
	const filePath = req.file.path
	const rawRunData = fs.readFileSync(filePath)
	const formattedRunData = formatRunData(rawRunData)
	res.json(formattedRunData)
})

app.listen(5000, () => {
	console.log("server started on port 5000")
})