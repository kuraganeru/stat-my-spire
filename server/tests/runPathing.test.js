import { formatPathPerFloor, formatPathTaken, checkPathEquality, formatQuestionMarkFloors } from "../modules/runPathing.mjs";

test("Replaces null value with 'AB' or returns original value", () => {
    const with_null = ['M', 'E', null, 'BOSS', null]
    const without_null = ['M', 'E', 'T']
    const with_expected = ['M', 'E', 'AB', 'BOSS', 'AB']
    const without_expected = ['M', 'E', 'T']
    expect(formatPathPerFloor(with_null)).toEqual(with_expected)
    expect(formatPathPerFloor(without_null)).toEqual(without_expected)
})

test("Splices in 'AB' value after 'BOSS' values", () => {
    const without_AR = [ "M", "BOSS", "M", "BOSS", "M", "BOSS", "R", "BOSS" ]
    const with_expected = [ "M", "BOSS", "AB", "M", "BOSS", "AB", "M", "BOSS", "AB", "R", "BOSS", "AB" ]

    // expect(formatPathTaken(real)).toEqual(real_formatted)
    expect(formatPathTaken(without_AR)).toEqual(with_expected)
})

test("checks equality between formatted path_taken and path_per_floor arrays", () => {
    const pathTaken = [ "M", "M", "$", "M", "M", "E", "?", "R", "T", "M", "?", "E", "R", "$", "R", "BOSS", "M", "M", "M", "?", "?", "E", "?", "M", "T", "E", "?", "E", "M", "M", "R", "BOSS", "M", "?", "$", "M", "$", "?", "E", "R", "T", "?", "E", "M", "?", "E", "R", "BOSS", "R", "$", "E", "BOSS" ]
    const pathFloor = [ "M", "M", "$", "M", "M", "E", "?", "R", "T", "M", "M", "E", "R", "$", "R", "B", null, "M", "M", "M", "?", "?", "E", "?", "M", "T", "E", "?", "E", "M", "M", "R", "B", null, "M", "?", "$", "M", "$", "?", "E", "R", "T", "?", "E", "M", "?", "E", "R", "B", null, "R", "$", "E", "B", null ]
    expect(checkPathEquality(pathTaken, pathFloor)).toBe(true)
})

test("returns an array with formatted question mark floors", () => {
    const pathTaken = ['M', '?', '?', '?', '?']
    const pathFloor = ['M', 'M', '?', 'T', '$']
    const expected = ['M', 'QM', 'QEV', 'QT', 'Q$']
    expect(formatQuestionMarkFloors(pathTaken, pathFloor)).toEqual(expected)
})