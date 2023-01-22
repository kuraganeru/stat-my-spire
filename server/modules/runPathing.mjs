import { floorTypes } from "../game_data/floorTypes.mjs"

const formatPathPerFloor = arr => {
    return arr.map(val => {
        if (val === null) {
            return "AB"
        }
        if (val === "B") {
            return "BOSS"
        }
        return val
    })
}

/*
    Decrements through an array, and splices in an "AB" value after every instance of "BOSS"
    testing - path[i+1] in conditional not required?
*/
const formatPathTaken = arr => {
    let path = [...arr]
    for (let i = path.length - 1; i >= 0; i--) {
        if (path[i] === "BOSS" && path[i + 1] != "BOSS") {
            path.splice(i + 1, 0, "AB")
        }
    }
    return path
}

/*
    Helper function for checking equality between pathTaken and pathPerFloor arrays. Because checkPathEquality is run before replacing question mark rooms, it will inevitably return false due to ? values differing. This returns an array with the "real" values replaced with "?" to test equality, given that the question mark values correlate to each other.
*/
const replaceQuestionMarkFloors = (pathTaken, pathPerFloor) => {
    const questionMarkValues = ["M", "?", "T", "$"]
    return pathTaken.map((floorTaken, index) => {
        if (floorTaken !== "?") {
            return floorTaken
        }
        if (questionMarkValues.includes(pathPerFloor[index])) {
            return "?"
        }
    })
}

const checkPathEquality = (pathTaken, pathPerFloor) => {
    const formattedPathTaken = formatPathTaken(pathTaken)
    const formattedPathPerFloor = formatPathPerFloor(pathPerFloor)
    const questionMarkFloors = replaceQuestionMarkFloors(formattedPathTaken, formattedPathPerFloor)

    return formattedPathTaken.length === formattedPathPerFloor.length && questionMarkFloors.every((pathFloor, index) => pathFloor === formattedPathTaken[index])
}

/*
    Replaces "?" floors with a string which indicates what the floor actually is. pathTaken contains a ?, while pathFloor may randomly contain ?, M, $, or T. 
    if pathTaken[i] is not a ?, ignore the value entirely.
    if pathTaken[i] IS a ?, reference pathFloor for the "real" value and replace with formatted value.
*/
const renameQuestionMarkFloors = (pathTaken, pathFloor) => {
    return pathTaken.map((floorTaken, index) => {
        if (floorTaken !== "?") {
            return floorTaken
        }
        switch (pathFloor[index]) {
            case "?":
                return "QEV"
            case "M":
                return "QM"
            case "$":
                return "Q$"
            case "T":
                return "QT"
        }
    })
}

const returnInitialFloorValues = (pathTaken, pathFloor, hpPerFloor, goldPerFloor) => {
    const formattedBasePath = renameQuestionMarkFloors(pathTaken, pathFloor)

    return formattedBasePath.map((floor, index) => {
        const foundFormattedFloor = floorTypes.find(formattedFloor => formattedFloor.orig_name === floor)
        return {
            orig_type: foundFormattedFloor.orig_name,
            type: foundFormattedFloor.new_name,
            floor: index + 1,
            current_hp: hpPerFloor[index],
            current_gold: goldPerFloor[index]
        }
    })
}

const returnAllFloorValues = (initialFloors, rawRunData) => {
    return initialFloors.map(floor => {
        switch (floor.orig_type) {
            case "M":
            case "QM":
            case "E":
            case "BOSS":
                return formatCombatFloors(floor, rawRunData);
            case "R":
                return formatRestSiteFloors(floor, rawRunData);
            case "$":
            case "Q$":
                return formatShopFloors(floor, rawRunData);
            case "QEV":
                return formatEventFloors(floor, rawRunData);
            case "AB":
                return formatAfterBossFloors(floor, rawRunData);
            case "T":
            case "QT":
                return formatTreasureFloors(floor, rawRunData);
        }
    })
}

const formatCombatFloors = (floorData, rawRunData) => {
    const { damage_taken, card_choices, potions_obtained, relics_obtained } = rawRunData;

    const combatResultOnFloor = damage_taken.find(combatResult => combatResult.floor === floorData.floor)
    const cardsOfferedOnFloor = card_choices.find(cardOffered => cardOffered.floor === floorData.floor)
    const potionOfferedOnFloor = potions_obtained.find(potionOffered => potionOffered.floor === floorData.floor)
    const relicsFoundOnFloor = relics_obtained.find(relicsFound => relicsFound.floor === floorData.floor)

    return {
        ...floorData,
        enemies: combatResultOnFloor.enemies,
        damage_taken: combatResultOnFloor.damage,
        turns_taken: combatResultOnFloor.turns,
        card_picked: cardsOfferedOnFloor ? cardsOfferedOnFloor.picked : null,
        card_not_picked: cardsOfferedOnFloor ? cardsOfferedOnFloor.not_picked : null,
        potion_found: potionOfferedOnFloor ? potionOfferedOnFloor.key : null,
        relics_found: relicsFoundOnFloor ? relicsFoundOnFloor.key : null
    }
}

const formatRestSiteFloors = (floorData, rawRunData) => {
    const { campfire_choices } = rawRunData
    const campfireChoiceFoundOnFloor = campfire_choices.find(campChoice => campChoice.floor === floorData.floor)

    return {
        ...floorData,
        campfire_action: campfireChoiceFoundOnFloor.key,
        upgraded_card: campfireChoiceFoundOnFloor.key === "SMITH" ? campfireChoiceFoundOnFloor.data : null
    }
}

const formatShopFloors = (floorData, rawRunData) => {
    const { item_purchase_floors, items_purchased, items_purged_floors, items_purged } = rawRunData;

    const foundPurchasedItems = formatShopPurchases(item_purchase_floors, items_purchased, floorData)

    const foundShopRemovals = formatShopRemovals(items_purged_floors, items_purged, floorData)

    return {
        ...floorData,
        purchases: foundPurchasedItems.map(shop => shop.purchase),
        card_removal_choice: foundShopRemovals ? foundShopRemovals.card_removal : null
    }
}

const formatShopRemovals = (purged_floors, items_purged, floorData) => {
    const formatShopRemovals = purged_floors.map((shopFloor, index) => {
        return {
            floor: shopFloor,
            card_removal: items_purged[index]
        }
    })

    return formatShopRemovals.find(purchasedRemoval => purchasedRemoval.floor === floorData.floor)
}

const formatShopPurchases = (item_purchase_floors, items_purchased, floorData) => {
    const formatShopPurchases = item_purchase_floors.map((shopFloor, index) => {
        return {
            floor: shopFloor, purchase: items_purchased[index]
        }
    })

    return formatShopPurchases.filter(shopPurchase => shopPurchase.floor === floorData.floor)
}

const formatEventFloors = (floorData, rawRunData) => {
    const { event_choices } = rawRunData;
    const foundEventResult = event_choices.find(eventFloor => eventFloor.floor === floorData.floor)

    return {
        ...floorData,
        ...foundEventResult
    }
}

const formatAfterBossFloors = (floorData, rawRunData) => {
    const { boss_relics, relic_stats } = rawRunData

    const { foundBossRelics, skippedBossRelics } = formatBossRelics(boss_relics, relic_stats, floorData)

    return {
        ...floorData,
        boss_picked_relic: foundBossRelics ? foundBossRelics.relic_name : null,
        boss_skipped_relic: skippedBossRelics ? skippedBossRelics.not_picked : null
    }
}

const formatBossRelics = (boss_relics, relic_stats, floorData) => {
    const obtainStats = relic_stats.obtain_stats[0]
    const reduceRelicStats = Object.entries(obtainStats).reduce((totalValue, currentValue) => {
        return [
            ...totalValue,
            {
                relic_name: currentValue[0],
                floor_obtained: currentValue[1]
            }
        ]
    }, [])

    const foundBossRelics = reduceRelicStats.find(bossRelic => bossRelic.floor_obtained === floorData.floor)
    const skippedBossRelics = foundBossRelics && boss_relics.find(bossRelic => bossRelic.picked === foundBossRelics.relic_name)
    return {
        foundBossRelics,
        skippedBossRelics
    }
}

const formatTreasureFloors = (floorData, rawRunData) => {
    const { blue_key_relic_skipped_log: blue_key_log, relics_obtained } = rawRunData
    const foundTreasure = relics_obtained.find(treasure => treasure.floor === floorData.floor)
    const skippedTreasureStr = `Skipped ${blue_key_log ? blue_key_log.relicID : "unavailable"} for Blue Key (Skipped relic not available for old runs)`

    return {
        ...floorData,
        skipped_relic: !foundTreasure,
        found_relic: foundTreasure ? foundTreasure.key : skippedTreasureStr
    }
}

const returnFormattedRunHistory = (rawRunData) => {
    const { path_per_floor, path_taken, current_hp_per_floor, gold_per_floor } = rawRunData;
    const formattedPathFloor = formatPathPerFloor(path_per_floor);
    const formattedPathTaken = formatPathTaken(path_taken);
    const initialFloorValues = returnInitialFloorValues(formattedPathTaken, formattedPathFloor, current_hp_per_floor, gold_per_floor);

    return returnAllFloorValues(initialFloorValues, rawRunData)
}

export { formatPathPerFloor, formatPathTaken, checkPathEquality, renameQuestionMarkFloors, returnInitialFloorValues, returnAllFloorValues, returnFormattedRunHistory }