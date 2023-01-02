import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [run, setRun] = useState({})

  const getRunData = async () => {
    const response = await fetch('http://localhost:5000/run')
    const responseJSON = await response.json()
    setRun(responseJSON)
  }

  useEffect(() => {
    getRunData()
  }, [])

  return (
    <div className="App">
      <h1>Stat My Spire</h1>
      <h3>{run.character}</h3>
      <h3>Ascension: {run.ascension_level}</h3>
      <h3>{run.victory ? "Victory!" : "Defeated..."}</h3>

      <div>
        <h2>Deck:</h2>
        <ul>
          {
            run.final_deck && run.final_deck.map(card => {
              return <li>{card.card_name} x{card.copies}</li>
            })
          }
        </ul>
      </div>

      <div>
        <h2>Relics:</h2>
        <ul>
          {
            run.relics_obtained && run.relics_obtained.map(relic => {
              return <li>{relic.relic_name}</li>
            })
          }
        </ul>
      </div>

      <div>
        <h2>Spire Path:</h2>
        <ul>
          {
            run.run_nodes && run.run_nodes.map(floor => {
              return <li>Floor {floor.floor}: {floor.type}</li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default App
