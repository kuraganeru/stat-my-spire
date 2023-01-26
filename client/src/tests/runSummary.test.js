import React from 'react'
import { render, screen } from '@testing-library/react'
import RunSummary from '../components/RunSummary'

test("Has the character value from the uploaded file", () => {
    const formattedRun = { character: "The Silent" }
    render(<RunSummary formattedRun={formattedRun} />)
    expect(screen.getByRole('heading')).toHaveTextContent('The Silent')
})