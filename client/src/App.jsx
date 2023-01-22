import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [rawRun, setRawRun] = useState('')
  const [formattedRun, setFormattedRun] = useState({})

  const handleSubmit = e => {
    e.preventDefault();
    
    // create formdata
    let formData = new FormData();
    formData.append('runData', rawRun)

    // upload formdata to backend
    const uploadRunData = async () => {
      const response = await fetch('http://localhost:5000/upload_files', {
        method: "POST",
        body: formData
      })
      const responseJSON = await response.json();
      setFormattedRun(responseJSON)
    }
    uploadRunData()
    // console.log(formattedRun) doesn't work here! see useeffect below
  }

  const handleSubmitRun = (ev) => {
    setRawRun(ev.target.files[0])
  }

  /*
      good enough explanation: setState / setFormattedRun in the handleSubmit function above is async - it lets the console.log(formattedRun) execute while it sets the value. which is also why the empty console.log on line 27 appears before, if we were to put a console.log at l25 
  */
  useEffect(() => {
    // component updated? do this
    if (Object.keys(formattedRun).length > 0) {
      console.log(formattedRun)
    }
  }, [formattedRun])

  return (
    <div className="App">
      <h1>Stat My Spire</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="files" id="files" accept=".run" onChange={handleSubmitRun}  />
        <button type="submit">Submit</button>
      </form>
      <h2>{formattedRun.character}</h2>
    </div>
  )
}

export default App
