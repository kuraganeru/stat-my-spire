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
const formatQuestionMarkFloors = (pathTaken, pathFloor) => {
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
    const formattedBasePath = formatQuestionMarkFloors(pathTaken, pathFloor)

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

    const formatShopPurchases = item_purchase_floors.map((shopFloor, index) => {
        return {
            floor: shopFloor, purchase: items_purchased[index]
        }
    })

    const itemsPurchasedOnFloor = formatShopPurchases.filter(shopPurchase => shopPurchase.floor === floorData.floor)

    // Finding purchased card removals
    const formatShopRemovals = items_purged_floors.map((shopFloor, index) => {
        return {
            floor: shopFloor,
            card_removal: items_purged[index]
        }
    })

    const cardRemovalFoundOnFloor = formatShopRemovals.find(purchasedRemoval => purchasedRemoval.floor === floorData.floor)

    return {
        ...floorData,
        purchases: itemsPurchasedOnFloor.map(shop => shop.purchase),
        card_removal_choice: cardRemovalFoundOnFloor ? cardRemovalFoundOnFloor.card_removal : null
    }
}

export { formatPathPerFloor, formatPathTaken, checkPathEquality, formatQuestionMarkFloors, returnInitialFloorValues, returnAllFloorValues }