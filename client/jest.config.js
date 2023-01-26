const config = {
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    automock: false,
    setupFilesAfterEnv: [
        "./src/tests/setupJest.js"
    ],
    extensionsToTreatAsEsm: [".jsx"],
    testEnvironment: "jsdom"
}

export default config;