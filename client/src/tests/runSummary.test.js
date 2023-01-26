import React from 'react'
import { render, screen } from '@testing-library/react'
import RunSummary from '../components/RunSummary'

test("Has the character value from the uploaded file", () => {
    const formattedRun = { character: "The Silent", ascension_level: 5 }
    render(<RunSummary formattedRun={formattedRun} />)
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('The Silent')
    expect(screen.getByRole('heading', {level: 3})).toHaveTextContent('5')
})