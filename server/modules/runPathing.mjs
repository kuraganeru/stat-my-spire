import { floorTypes } from "../game_data/floorTypes.mjs"

const formatPathPerFloor = arr => {
    return arr.map(val => {
        if (val === null) {
            return "AB"
        }
        if (val === "B") {
            return "BOSS"
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
    const formattedPathTaken = formatPathTaken(pathTaken)
    const formattedPathPerFloor = formatPathPerFloor(pathPerFloor)
    
    return formattedPathTaken.length === formattedPathPerFloor.length && formattedPathPerFloor.every(pathFloor => formattedPathTaken.includes(pathFloor))
}

/*
    Replaces "?" floors with a string which indicates what the floor actually is. pathTaken contains a ?, while pathFloor may randomly contain ?, M, $, or T. 
    if pathTaken[i] is not a ?, ignore the value entirely.
    if pathTaken[i] IS a ?, reference pathFloor for the "real" value and replace with formatted value.
*/
const formatQuestionMarkFloors = (pathTaken, pathFloor) => {
    return pathTaken.map((floorTaken, index) => {
        if (floorTaken !== "?") {
            return floorTaken
        }
        switch (pathFloor[index]) {
            case "?":
                return "QEV"
            case "M":
                return "QM"
            case "$":
                return "Q$"
            case "T":
                return "QT"
        }
    })
}


export { formatPathPerFloor, formatPathTaken, checkPathEquality, formatQuestionMarkFloors }