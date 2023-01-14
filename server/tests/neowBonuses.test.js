import * as nb from "../modules/neowBonuses.mjs"

test("Returns a card received from Neow bonus, if it exists", () => {
    const formattedCardBonus = {
        original_name: 'RANDOM_COLORLESS_2',
        formatted_name: 'Choose a rare colorless card to obtain',
        has_bonus_card: true
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
    const returnedNotCardBonus = { picked: null, not_picked: null }

    expect(nb.getNeowBonusCard(formattedCardBonus, floorZero)).toEqual(returnedNeowCardBonus)
    expect(nb.getNeowBonusCard(noCardBonus, floorOne)).toEqual(returnedNotCardBonus)
})

test("Returns a relic received from Neow bonus, if it exists", () => {
    const formattedCardBonus = {
        has_bonus_relic: true
    }

    const relicList = {
        obtain_stats: [{"Ring of the Snake": 0, "Vajra": 0}]
    }

    const expected = "Vajra"
    expect(nb.getNeowBonusRelic(formattedCardBonus, relicList)).toEqual(expected)
})

test("Returns an array of Neow bonus(es) objects with formatted names", () => {
    const bonus = ["RANDOM_COMMON_RELIC"]
    const skippedBonus = [ 'RANDOM_COLORLESS', 'TWENTY_PERCENT_HP_BONUS', 'BOSS_RELIC' ]
    const expectedBonus = [
        {
          original_name: 'RANDOM_COMMON_RELIC',
          formatted_name: 'Obtain a random common relic',
          has_bonus_card: false,
          has_bonus_relic: true
        }
      ]
    const expectedSkipped = [
        {
          original_name: 'RANDOM_COLORLESS',
          formatted_name: 'Obtain a random colorless card',
          has_bonus_card: true,
          has_bonus_relic: false
        },
        {
          original_name: 'TWENTY_PERCENT_HP_BONUS',
          formatted_name: 'Gain 20% Max HP (Depends on character)',
          has_bonus_card: false,
          has_bonus_relic: false
        },
        {
          original_name: 'BOSS_RELIC',
          formatted_name: 'Obtain a random boss relic',
          has_bonus_card: false,
          has_bonus_relic: true
        }
      ]
    expect(nb.returnNeowBonusesArr(bonus)).toEqual(expectedBonus)
    expect(nb.returnNeowBonusesArr(skippedBonus)).toEqual(expectedSkipped)
})