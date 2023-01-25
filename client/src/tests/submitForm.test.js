import { uploadFormData } from "../components/SubmitForm";

beforeEach(() => {
    fetch.resetMocks()
})

test("Returns a string of the character in the run", async () => {
    fetch.mockResponseOnce(JSON.stringify({character: "The Silent"}))
    const run = await uploadFormData()
    expect(run.character).toEqual("The Silent")
    expect(fetch).toHaveBeenCalledTimes(1)
})