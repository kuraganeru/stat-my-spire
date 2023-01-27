import React from 'react'
import { render, screen } from '@testing-library/react'
import RunSummary from '../components/RunSummary'
import sampleFormattedRun from "./sampleFormattedRun"

test("Has the character value from the uploaded file", () => {
    render(<RunSummary formattedRun={sampleFormattedRun} />)

    const runHeaders = screen.getAllByRole('heading', {level: 3})
    
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('The Silent')

    expect(runHeaders[0]).toHaveTextContent('Ascension Level 5')
    expect(runHeaders[1]).toHaveTextContent("Victory!")
})