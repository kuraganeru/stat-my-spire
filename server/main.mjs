import express from 'express'
import multer from 'multer'
import cors from "cors"
import * as fs from 'fs'

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
	{oldName: "AscendersBane", newName: "Ascender's Bane"},
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
	const reduced = arr.reduce((accum, curr) => { 		// runs a reduce to turn the master deck into an array of objects
		return {
			...accum,
			[curr]: (accum[curr] || 0) + 1
		}
	}, {})

	const cardDataObj = Object.entries(reduced).map(([name, copies]) => {
		const slicedName = name.slice(-3)		// gets the last 3 characters of the card name:
		const plusIdx = slicedName.indexOf('+')		// random characters = unupgraded card; [char]+1 = upgraded card; +[num] = card upgraded multiple times, ie. ironclad's searing blow, downfall guardian's refracted beam
		const charAfterPlusNaN = !Number.isNaN(parseInt(slicedName.charAt(plusIdx + 1)))		// converts the character after the plus to a number, and checks if the character is NOT NaN, meaning it checks if it is a valid number. 
		// console.log(`${name}: ${charAfterPlusNaN}. ${charAfterPlusNaN ? 'upgraded' : 'NOT unupgraded'}`) 		// valid number (should) mean upgraded card
		const isUpgradedCard = plusIdx > -1 && charAfterPlusNaN

		return {
			baseCardName: isUpgradedCard ? name.slice(0, name.indexOf('+')) : name,
			cardName: name,
			copies: copies,
			cardUpgradeValue: isUpgradedCard ? slicedName.slice(plusIdx + 1) : 0
		}
	})
	return cardDataObj
}

const updateCardNames = (arr) => {
	const cards = arr.map((val) => {
		const findOutdatedCards = cardNames.find(c => c.oldName === val.baseCardName)
		const upgradeInt = parseInt(val.cardUpgradeValue, 10)
		return findOutdatedCards ? { 
			...val, 
			baseCardName: findOutdatedCards.newName, 
			cardName: upgradeInt === 1 ? `${findOutdatedCards.newName}+1` : findOutdatedCards.newName,
			cardUpgradeValue: upgradeInt
		} : {...val, cardUpgradeValue: upgradeInt};
	})
	return cards
}


// m: monster
// ? : event ?
// $: shop
// r: rest
// e: elite
// b: boss

// floors / pathing
const runPathing = (data) => {
	const {campfire_choices, damage_taken, path_per_floor, path_taken, card_choices, event_choices, boss_relics, potions_obtained, gold_per_floor, items_purchased, item_purchase_floors, items_purged_floors, items_purged, relics_obtained} = data
	// array of objects
	// objects will be what happens on each floor
	// use path_taken as base

	//obtain_stats - when a relic was picked up
	// A1-19:
		// floor 50 - act 3 boss
		// floor 51 - unknown / defeated act 3 boss (no relic)
		// floor 55 - heart
		// floor 56 - unknown / defeated heart

	// a20:
		// floor 50 - act 3 boss
		// floor 51 - act 3 boss #2
		// floor 52 - defeated act 3 bosses
		// floor 56 - heart
		// floor 57 - defeated heart

	// if (floor = 51 || 52 || 56 || 57 || last item in entire thing is AB), "boss treasure" / after boss AB

	/* monsters / hallway combat: 
	if orig_type = M, check
		damage_taken - damage taken, enemies fought, turns taken
		potions_obtained - check if floor = floor of any potions OR check potions_floor_spawned
		card_choices - display picked, not_picked
	*/

	const floorData = path_per_floor.map(val => val || "AB").map((val, index) => { 
		// path_per_floor closer matches the actual game, as the max floor is 55/56
		// boss relic / null value DOES count as a floor - don't remove null value from path_taken
		const floorTypes = [
			{orig_name: "M", new_name: "Monster"}, 
			{orig_name: "?", new_name: "Question Mark"}, 
			{orig_name: "$", new_name: "Shop"},
			{orig_name: "E", new_name: "Elite"},
			{orig_name: "B", new_name: "Boss"},
			{orig_name: "R", new_name: "Rest Site"},
			{orig_name: "T", new_name: "Treasure"},
			{orig_name: "AB", new_name: "After Boss"}]
		const formattedType = floorTypes.find(obj => obj.orig_name === val)
		const replaceEvent = formattedType.orig_name === "?" ? path_per_floor[index] : null
		return {
			orig_type: formattedType.orig_name,
			type: formattedType.new_name,
			floor: index + 1,
			event: {
				isEvent: replaceEvent === "?" ? true : false
			}
		}
	})

	// tracking gold
	// starting gold = 99
	// gold_per_floor - check vs previous index / flood
	// "gold" - final gold value
	// event_choices - lists gold gain / loss
	// check for neow bonus - if exists, neow_bonus_log

	const checkMonsters = floorData.map((val, index) => {
		if (val.orig_type === "M" || val.orig_type === "E") {
			const fightData = damage_taken.find(m => m.floor === val.floor)
			const cardData = card_choices.find(c => c.floor === val.floor)
			const potionObtainedData = potions_obtained.find(po => po.floor === val.floor)
			return {
				...val,
				enemies: fightData.enemies,
				damageTaken: fightData.damage,
				turns: fightData.turns,
				cardRewardPicked: cardData.picked, // edge case for act 3 / heart
				cardsSkipped: cardData.not_picked, // neither of the above drop cards
				potionFound: {
					didFindPotion: potionObtainedData ? true : false,
					potionFound: potionObtainedData ? potionObtainedData.key : null
				}
			}
		}

		if (val.orig_type === "R") {
			const restData = campfire_choices.find(camp => camp.floor === val.floor)
			return {
				...val,
				restAction: restData.key,
				restSmithedCard: restData.key === "SMITH" ? restData.data : null
			}
		}

		// items_purged - removed cards from deck - from shop, events?
		// purchased_purges - lists how many card removes were purchased
		// items_purged_floors - lists shop floors 
		// purchased_purges === items_purged_floors.length === items_purged.length
		// these data sets do not include other methods of card removal ie. peace pipe, events
		if (val.orig_type === "$") {
			// combine purchase + floor, and return filtered array for a given floor
			const shopPurchases = item_purchase_floors.map((shopFloor, index) => ({floor: shopFloor, purchase: items_purchased[index]}))
			const purchasesPerFloor = shopPurchases.filter(sp => sp.floor === val.floor)

			// combine removal + floor, and find the removal
			const shopRemovals = items_purged_floors.map((shopFloor, index) => ({floor: shopFloor, removal: items_purged[index]}))
			const removal = shopRemovals.find(rm => rm.floor === val.floor)

			return {
				...val,
				purchases: purchasesPerFloor.map(item => item.purchase),
				cardRemoval: removal ? removal.removal : null
			}
		}
		
		// relics:
		// relics_obtained = relics from elites, chests, events - means we need to check this in the above as well
		// boss_relics = self explan
		// relics - whole list of relics (shops, et al)
		// relic_states - would probably need to handcode all the values - maybe? lol

		if (val.orig_type === "T") {
			console.log(val)
			const treasureData = relics_obtained.find(treasureFloor => treasureFloor.floor === val.floor)
			console.log()
			return {
				...val,
				foundRelic: treasureData ? treasureData.key : "Skipped Relic (For blue key)"
			}
		}

		// question marks:
		/* question marks can be:
			-event -> event_choices
			-monster / combat -> damage_taken, card_choices, potions_obtained
			-treasure -> relilcs_obtained
			-shop -> item_purchase_floors, items_purchased
		*/
		return val // add generic stuff like gold, HP here? so it would get added onto all data objs
	})
	return checkMonsters
}

// routes
app.post("/upload", async (req, res) => {
	const data = fs.readFileSync('uploads/clad.json')
	const dataJSON = JSON.parse(data)
	const formattedDeck = masterDeck(dataJSON.master_deck)
	const updatedCards = updateCardNames(formattedDeck)
	const runPath = runPathing(dataJSON)
	res.json(runPath)
})

// works - putting aside for now to use hardcoded
app.post("/upload_files", upload.single("files"), (req, res) => {
	const filePath = req.file.path

	// read file
	const data = fs.readFileSync(filePath)
	const runDataJSON = JSON.parse(data)
	const formattedDeck = masterDeck(runDataJSON.master_deck)
	console.log(`Cards: ${JSON.stringify(masterDeck(runDataJSON.master_deck))}`)
	res.json(formattedDeck)
})

app.listen(5000, () => {
	console.log("server started on port 5000")
})