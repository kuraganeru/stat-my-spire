import { cardNames } from "./cardNames.mjs"

/*
    Checks if a card is using an outdated name, and returns an object containing information about the card - the original name, new name, and if it is upgraded.
    arr - the unformatted deck values from the .run file
*/
const updateCardNames = arr => {
    const formattedCards = arr.map((val) => {
        const foundOutdatedCard = cardNames.find(card => card.oldName === val.base_card_name);
        return foundOutdatedCard ? {
            ...val,
            base_card_name: foundOutdatedCard.newName,
            card_name: val.card_upgrade ? foundOutdatedCard.upgradedNewName : foundOutdatedCard.newName,
            card_upgrade: val.card_upgrade
        } : val
    })
    return formattedCards
}

const formatNewCardNames = (arr) => {
    return arr.map(val => {
        return (
            val.card_upgrade === 1 ? {...val, card_name: `${val.base_card_name}+`} :
            val.card_upgrade > 1 ? {...val, card_name: `${val.base_card_name}+${val.card_upgrade}`} :
            {...val, card_name: val.card_name}
        )
    })
}

// Takes the master deck data, and returns an object of cards
// key: card name, value: number of copies in deck
const formatRawMasterDeck = arr => {
    return arr.reduce((accum, curr) => {
        return {
            ...accum,
            [curr]: (accum[curr] || 0) + 1
        }
    }, {})
}

const formatDeckNew = arr => {
    const masterDeck = formatRawMasterDeck(arr)
    const formatCardData = Object.entries(masterDeck).map(([name, copies]) => {
        const slicedName = name.slice(-3)
        const plusIdx = slicedName.indexOf('+')
        const charAfterPlusNaN = !Number.isNaN(parseInt(slicedName.charAt(plusIdx + 1)))
        const isUpgradedCard = plusIdx > -1 && charAfterPlusNaN
        return {
            base_card_name: isUpgradedCard ? name.slice(0, name.indexOf('+')) : name,
            card_name: name,
            copies: copies,
            card_upgrade: isUpgradedCard ? parseInt(slicedName.slice(plusIdx + 1)) : 0
        }
    })
    return formatCardData
    // return updateCardNames(formatCardData)
}

const returnFormattedDeck = (arr) => {
    const formatDeck = formatDeckNew(arr)
    const updateCards = formatNewCardNames(updateCardNames(formatDeck))
    return updateCards
}

export { formatRawMasterDeck, formatDeckNew, updateCardNames, formatNewCardNames, returnFormattedDeck }