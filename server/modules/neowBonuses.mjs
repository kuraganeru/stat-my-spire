import { neowBonuses, neowCosts } from '../game_data/neow.mjs'

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
    const starterRelics = ["Burning Blood", "Ring of the Snake", "Cracked Core", "Pure Water"]
	const foundBonusRelicArr = Object.entries(relic_stats.obtain_stats[0]).find(val => {
        return !val.some(x => starterRelics.includes(x)) && val.includes(0)
    })
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

export { returnFormattedNeowBonus, getNeowBonusCard, getNeowBonusRelic, returnNeowBonusesArr, returnNeowCosts}