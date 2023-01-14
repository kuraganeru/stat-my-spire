import * as nb from "../modules/neowBonuses.mjs"

test("Returns a card received from Neow bonus, if it exists", () => {
    const formattedCardBonus = {
        original_name: 'RANDOM_COLORLESS_2',
        formatted_name: 'Choose a rare colorless card to obtain',
        has_bonus_card: true,
        has_bonus_relic: false
    }
    const noCardBonus = {
        has_bonus_card: false
    }
    const floorZero = [
        {
            not_picked: ['Thinking Ahead', 'Metamorphosis'],
            picked: 'Master of Strategy',
            floor: 0
        }]
    const floorOne = {
        floor: 1
    }
    const returnedNeowCardBonus = {
        not_picked: ['Thinking Ahead', 'Metamorphosis'],
        picked: 'Master of Strategy',
        floor: 0
    }
    const returnedNotCardBonus = {picked: null, not_picked: null}

    expect(nb.getNeowBonusCard(formattedCardBonus, floorZero)).toEqual(returnedNeowCardBonus)
    expect(nb.getNeowBonusCard(noCardBonus, floorOne)).toEqual(returnedNotCardBonus)
})