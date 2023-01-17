import { formatPathPerFloor } from "../modules/runPathing.mjs";

test("Replaces null value with 'AB' or returns original value", () => {
    const with_null = ['M', 'E', null, 'B', null]
    const without_null = ['M', 'E', 'T']
    const with_expected = ['M', 'E', 'AB', 'B', 'AB']
    const without_expected = ['M', 'E', 'T']
    expect(formatPathPerFloor(with_null)).toEqual(with_expected)
    expect(formatPathPerFloor(without_null)).toEqual(without_expected)
})