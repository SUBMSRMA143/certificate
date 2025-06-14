// import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1>chl to rha h</h1> */}
      <Outlet />
    </>
  )
}

export default App
