import express from 'express'
import multer from 'multer'
import cors from "cors"
import * as fs from 'fs'
import path from 'path'
import { readFile } from 'fs/promises';

// code modules
import { charactersList } from './game_data/characters.mjs'
import {returnFormattedDeck} from "./modules/formatDeck.mjs"
import { returnFormattedNeowBonus } from './modules/neowBonuses.mjs'
import { relicData } from './modules/relics.mjs'
import { returnFormattedRunHistory } from './modules/runPathing.mjs'

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

const formatCharacterChosen = char => {
	return charactersList.find(character => character.original_name === char).formatted_name
}

const runInfo = (runData) => {
	const {victory, ascension_level, floor_reached, playtime, score, score_breakdown, seed_played, character_chosen, neow_bonus, neow_cost, card_choices, neow_bonuses_skipped_log, relic_stats} = runData

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
		character: formatCharacterChosen(character_chosen),
		neow_bonus: returnFormattedNeowBonus(neow_bonus, neow_cost, card_choices, neow_bonuses_skipped_log, relic_stats)
	}
}

const formatRunData = rawRunData => {
	const rawRunDataJSON = JSON.parse(rawRunData)
	const formatDeck = returnFormattedDeck(rawRunDataJSON.master_deck)
	const formatRunHistory = returnFormattedRunHistory(rawRunDataJSON)
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
	// const rawRunData = fs.readFileSync('uploads/silent.json')
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