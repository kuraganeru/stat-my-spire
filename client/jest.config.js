const config = {
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    automock: false,
    setupFiles: [
        "./src/tests/setupJest.js"
    ],
    extensionsToTreatAsEsm: [".jsx"]
}

export default config;