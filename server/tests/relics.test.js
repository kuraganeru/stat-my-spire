import { relicData, formatRelicObjectToArray } from "../modules/relics.mjs";

test("Returns an array of relic objects", () => {
    const relicStats = {
        Calipers: [582],
        Shovel: 1,
        "Pandora's Box": [
            'Distraction',
            'Unload'
        ],
    }
    const relicFloors = {
        Calipers: 26,
        Shovel: 40,
        "Pandora's Box": 34
    }
    const expectedStats = [
        { relic_name: 'Calipers', relic_stats: [ 582 ] },
        { relic_name: 'Shovel', relic_stats: 1 },
        {
          relic_name: "Pandora's Box",
          relic_stats: [
            'Distraction',
            'Unload',
          ]
        }
      ]
    const expectedFloors = [
        { relic_name: 'Calipers', floor_found: 26 },
        { relic_name: 'Shovel', floor_found: 40 },
        { relic_name: "Pandora's Box", floor_found: 34 }
    ]
    expect(formatRelicObjectToArray(relicFloors, "floor_found")).toEqual(expectedFloors)
    expect(formatRelicObjectToArray(relicStats, "relic_stats")).toEqual(expectedStats)
})