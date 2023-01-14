import { formatRawMasterDeck, formatDeckNew, updateCardNames, formatNewCardNames } from "../modules/formatDeck.mjs"

test("Returns an object of the array values, each appearing once", () => {
  const arr = ["Catalyst", "Blade Dance", "Strike+1"]
  const expectedValue = {
    Catalyst: 1,
    "Blade Dance": 1,
    "Strike+1": 1
  }
  expect(formatRawMasterDeck(arr)).toEqual(expectedValue)
})

test("Returns an object of the array values, tallying multiple identical values", () => {
  const arr = ['Catalyst', "Blade Dance", "Blade Dance", "Defend+1", "Defend+1"]
  const expectedValue = {
    Catalyst: 1,
    "Blade Dance": 2,
    "Defend+1": 2
  }
  expect(formatRawMasterDeck(arr)).toEqual(expectedValue)
})

test("Returns an array of objects with formatted card data", () => {
  const arr = ['Envenom+1', "Tools of the Trade+1", "Blade Dance", "Blade Dance", "Blade Dance+1"]
  const formattedCards = [{
    base_card_name: 'Envenom',
    card_name: 'Envenom+1',
    copies: 1,
    card_upgrade: 1
  },
  {
    base_card_name: 'Tools of the Trade',
    card_name: 'Tools of the Trade+1',
    copies: 1,
    card_upgrade: 1
  },
  {
    base_card_name: 'Blade Dance',
    card_name: 'Blade Dance',
    copies: 2,
    card_upgrade: 0
  },
  {
    base_card_name: 'Blade Dance',
    card_name: 'Blade Dance+1',
    copies: 1,
    card_upgrade: 1
  }]

  expect(formatDeckNew(arr)).toEqual(formattedCards)
})

test("Returns an array of cards, replacing outdated / unformatted names", () => {
  const arr = [
    {
      base_card_name: "Strike_G",
      card_name: "Strike_G",
      copies: 1,
      card_upgrade: 0
    },
    {
      base_card_name: "Defend_G",
      card_name: "Defend_G",
      copies: 1,
      card_upgrade: 0
    },
    {
      base_card_name: "Defend_G",
      card_name: "Defend_G+1",
      copies: 2,
      card_upgrade: 1
    },
    {
      base_card_name: "Blade Dance",
      card_name: "Blade Dance",
      copies: 1,
      card_upgrade: 0
    },
  ]
  const formattedCards = [
    {
      base_card_name: "Strike",
      card_name: "Strike",
      copies: 1,
      card_upgrade: 0
    },
    {
      base_card_name: "Defend",
      card_name: "Defend",
      copies: 1,
      card_upgrade: 0
    },
    {
      base_card_name: "Defend",
      card_name: "Defend+1",
      copies: 2,
      card_upgrade: 1
    },
    {
      base_card_name: "Blade Dance",
      card_name: "Blade Dance",
      copies: 1,
      card_upgrade: 0
    },
  ]
  expect(updateCardNames(arr)).toEqual(formattedCards)
})

test("return an array of cards with updated names", () => {
  const arr = [
    {
      base_card_name: "Strike",
      card_name: "Strike",
      copies: 1,
      card_upgrade: 0
    },
    {
      base_card_name: "Neutralize",
      card_name: "Neutralize+1",
      copies: 1,
      card_upgrade: 1
    },
    {
      base_card_name: "Searing Blow",
      card_name: "Searing Blow+10",
      copies: 1,
      card_upgrade: 10
    }
  ]

  const expectedArr = [
    {
      base_card_name: "Strike",
      card_name: "Strike",
      copies: 1,
      card_upgrade: 0
    },
    {
      base_card_name: "Neutralize",
      card_name: "Neutralize+",
      copies: 1,
      card_upgrade: 1
    },
    {
      base_card_name: "Searing Blow",
      card_name: "Searing Blow+10",
      copies: 1,
      card_upgrade: 10
    }
  ]
  expect(formatNewCardNames(arr)).toEqual(expectedArr)
})