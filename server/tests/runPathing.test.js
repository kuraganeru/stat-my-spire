import { formatPathPerFloor, formatPathTaken } from "../modules/runPathing.mjs";

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
    
    expect(formatPathTaken(real)).toEqual(real_formatted)
    expect(formatPathTaken(without_AR)).toEqual(with_expected)
})