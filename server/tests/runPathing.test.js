import { formatPathPerFloor, formatPathTaken, checkPathEquality, formatQuestionMarkFloors, returnInitialFloorValues, returnAllFloorValues } from "../modules/runPathing.mjs";
import { sampleRun } from "../game_data/sampleRun.js";

test("Replaces null value with 'AB' or returns original value", () => {
    const with_null = ['M', 'E', null, 'BOSS', null]
    const without_null = ['M', 'E', 'T']
    const with_expected = ['M', 'E', 'AB', 'BOSS', 'AB']
    const without_expected = ['M', 'E', 'T']
    expect(formatPathPerFloor(with_null)).toEqual(with_expected)
    expect(formatPathPerFloor(without_null)).toEqual(without_expected)
})

test("Splices in 'AB' value after 'BOSS' values", () => {
    const without_AR = ["M", "BOSS", "M", "BOSS", "M", "BOSS", "R", "BOSS"]
    const with_expected = ["M", "BOSS", "AB", "M", "BOSS", "AB", "M", "BOSS", "AB", "R", "BOSS", "AB"]

    // expect(formatPathTaken(real)).toEqual(real_formatted)
    expect(formatPathTaken(without_AR)).toEqual(with_expected)
})

test("checks equality between formatted path_taken and path_per_floor arrays", () => {
    const pathTaken = ["M", "M", "$", "M", "M", "E", "?", "R", "T", "M", "?", "E", "R", "$", "R", "BOSS", "M", "M", "M", "?", "?", "E", "?", "M", "T", "E", "?", "E", "M", "M", "R", "BOSS", "M", "?", "$", "M", "$", "?", "E", "R", "T", "?", "E", "M", "?", "E", "R", "BOSS", "R", "$", "E", "BOSS"]
    const pathFloor = ["M", "M", "$", "M", "M", "E", "?", "R", "T", "M", "M", "E", "R", "$", "R", "B", null, "M", "M", "M", "?", "?", "E", "?", "M", "T", "E", "?", "E", "M", "M", "R", "B", null, "M", "?", "$", "M", "$", "?", "E", "R", "T", "?", "E", "M", "?", "E", "R", "B", null, "R", "$", "E", "B", null]
    expect(checkPathEquality(pathTaken, pathFloor)).toBe(true)
})

test("returns an array with formatted question mark floors", () => {
    const pathTaken = ['M', '?', '?', '?', '?']
    const pathFloor = ['M', 'M', '?', 'T', '$']
    const expected = ['M', 'QM', 'QEV', 'QT', 'Q$']
    expect(formatQuestionMarkFloors(pathTaken, pathFloor)).toEqual(expected)
})

test("returns an array of formatted floor objects", () => {
    const pathTaken = ['M', 'T', '?']
    const pathFloor = ['M', 'T', '?']
    const hp_per_floor = [60, 54, 52]
    const gold_per_floor = [99, 120, 125]
    const expected = [{ orig_type: 'M', type: 'Monster', floor: 1, current_hp: 60, current_gold: 99 }, { orig_type: 'T', type: 'Treasure', floor: 2, current_hp: 54, current_gold: 120 }, { orig_type: 'QEV', type: 'Event', floor: 3, current_hp: 52, current_gold: 125 }]

    expect(returnInitialFloorValues(pathTaken, pathFloor, hp_per_floor, gold_per_floor)).toEqual(expected)
})

test("adds additional data to initial floor array values", () => {
    const initial = [
        { 
            orig_type: 'M', 
            type: 'Monster', 
            floor: 1, 
            current_hp: 63, 
            current_gold: 117 
        },
        { 
            orig_type: 'R', 
            type: 'Rest Site', 
            floor: 8, 
            current_hp: 34, 
            current_gold: 71 
        },
    ]
    
    const expected = [{
        "orig_type": "M",
        "type": "Monster",
        "floor": 1,
        "current_hp": 63,
        "current_gold": 117,
        "enemies": "Small Slimes",
        "damage_taken": 0,
        "turns_taken": 4,
        "card_picked": "Heel Hook",
        "card_not_picked": [
            "Riddle With Holes",
            "Choke"
        ],
        "potion_found": "FairyPotion",
        "relics_found": null
    },
    {
        "orig_type": "R",
        "type": "Rest Site",
        "floor": 8,
        "current_hp": 34,
        "current_gold": 71,
        "campfire_action": "SMITH",
        "upgraded_card": "Storm of Steel"
    },]

    expect(returnAllFloorValues(initial, sampleRun)).toEqual(expected)
})