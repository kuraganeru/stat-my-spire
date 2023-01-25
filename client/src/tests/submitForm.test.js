// import React so you can use JSX (React.createElement) in your test
import React from 'react'

/**
 * render: lets us render the component as React would
 * screen: a utility for finding elements the same way the user does
 */
import {render, screen} from '@testing-library/react'

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