import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import SubmitForm from './components/SubmitForm'
import RunSummary from './components/RunSummary'

function App() {
  const [rawRun, setRawRun] = useState('')
  const [formattedRun, setFormattedRun] = useState({})

  /*
      good enough explanation: setState / setFormattedRun in the handleSubmit function above is async - it lets the console.log(formattedRun) execute while it sets the value. which is also why the empty console.log on line 27 appears before, if we were to put a console.log at l25 
  */
  useEffect(() => {
    // component updated? do this
    if (formattedRun && Object.keys(formattedRun).length > 0) {
      console.log(formattedRun)
    }
  }, [formattedRun])

  return (
    <div className="App">
      <h1>Stat My Spire</h1>
      <SubmitForm setFormattedRun={setFormattedRun} setRawRun={setRawRun} rawRun={rawRun} />
      <RunSummary formattedRun={formattedRun} />
    </div>
  )
}

export default App
