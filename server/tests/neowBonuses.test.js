import * as nb from "../modules/neowBonuses.mjs"

test("Returns a card received from Neow bonus, if it exists", () => {
    const formattedCardBonus = {
        original_name: 'RANDOM_COLORLESS_2',
        formatted_name: 'Choose a rare colorless card to obtain',
        has_bonus_card: true,
        has_bonus_relic: false
    }
    const neowCardBonus = [
        {
            not_picked: ['Thinking Ahead', 'Metamorphosis'],
            picked: 'Master of Strategy',
            floor: 0
        }]
    const returnedNeowCardBonus = {
        not_picked: ['Thinking Ahead', 'Metamorphosis'],
        picked: 'Master of Strategy',
        floor: 0
    }
    expect(nb.getNeowBonusCard(formattedCardBonus, neowCardBonus)).toEqual(returnedNeowCardBonus)
})