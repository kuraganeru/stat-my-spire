import express from 'express'
import multer from 'multer'
import cors from "cors"
import * as fs from 'fs'
import path from 'path'
import { readFile } from 'fs/promises';

// code modules
import {cardNames} from "./game_data/cardNames.mjs"
import { charactersList } from './game_data/characters.mjs'
import { neowBonuses, neowCosts } from './game_data/neow.mjs'
import {returnFormattedDeck} from "./modules/formatDeck.mjs"


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

const formatCharacterChosen = char => {
	return charactersList.find(character => character.original_name === char).formatted_name
}

const getNeowBonusCard = (bonus, card_choices) => {
	if (bonus && (!bonus.has_bonus_card || card_choices[0].floor !== 0)) {
		return {picked: null, not_picked: null};
	}
	return card_choices[0]
}

const getNeowBonusRelic = (bonus, relic_stats) => {
	if (bonus && !bonus.has_bonus_relic) {
		return null
	}
	const foundBonusRelicArr = Object.entries(relic_stats.obtain_stats[0]).find(val => val.includes(0))
	return foundBonusRelicArr[0] //str
}

const returnNeowBonusesArr = (bonusArr) => {
	return bonusArr.map(val => {
		return neowBonuses.find(neowBonus => neowBonus.original_name === val)
	})
}

const returnNeowCosts = cost => {
	return neowCosts.find(neowCost => neowCost.original_name === cost).formatted_name
}

const returnFormattedNeowBonus = (bonus, cost, card_choices, skippedBonuses, relic_stats) => {
	const chosenBonus = returnNeowBonusesArr(bonus)
	const chosenCost = returnNeowCosts(cost)
	return {
		neow_bonus_chosen: {
			...chosenBonus[0], 
			bonus_cards: getNeowBonusCard(chosenBonus[0], card_choices),
			bonus_relic: getNeowBonusRelic(chosenBonus[0], relic_stats)
		},
		neow_cost_chosen: chosenCost,
		neow_skipped: returnNeowBonusesArr(skippedBonuses)
		// put neow_relic here
	}
}

const runInfo = (runData) => {
	const {victory, ascension_level, floor_reached, playtime, score, score_breakdown, seed_played, character_chosen, neow_bonus, neow_cost, card_choices, neow_bonuses_skipped_log, relic_stats} = runData

	const formatSecondsToHours = seconds => {
		let date = new Date()
		date.setSeconds(seconds)
		return date.toISOString().substr(11, 8)
	}

	const neowBonusArr = [neow_bonus] // set to an array for formatting uses
	
	return {
		ascension_level,
		floor_reached,
		victory: victory,
		run_time: formatSecondsToHours(playtime),
		score,
		score_breakdown,
		seed: seed_played,
		character: formatCharacterChosen(character_chosen),
		neow_bonus: returnFormattedNeowBonus(neowBonusArr, neow_cost, card_choices, neow_bonuses_skipped_log, relic_stats)
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

const formatRunData = rawRunData => {
	const rawRunDataJSON = JSON.parse(rawRunData)
	const formatDeck = returnFormattedDeck(rawRunDataJSON.master_deck)
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