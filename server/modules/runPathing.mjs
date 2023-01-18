import { floorTypes } from "../game_data/floorTypes.mjs"

const formatPathPerFloor = arr => {
    return arr.map(val => {
        if (val === null) {
            return "AB"
        }
        return val
    })
}

/*
    Decrements through an array, and splices in an "AB" value after every instance of "BOSS"
    testing - path[i+1] in conditional not required?
*/
const formatPathTaken = arr => {
    let path = [...arr]
    for (let i = path.length - 1; i >= 0; i--) {
        if (path[i] === "BOSS" && path[i + 1] != "BOSS") {
            path.splice(i + 1, 0, "AB")
        }
    }
    return path
}

const checkPathEquality = (pathTaken, pathPerFloor) => {
    return pathTaken.length === pathPerFloor.length && pathPerFloor.every(pathFloor => pathTaken.includes(pathFloor))
}

export { formatPathPerFloor, formatPathTaken, checkPathEquality }