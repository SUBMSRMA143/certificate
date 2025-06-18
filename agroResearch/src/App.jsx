// import { useState } from 'react'
// import './App.css'
import { Outlet, Link, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  // const [count, setCount] = useState(0)
  const location = useLocation();
  const ishome = location.pathname === "/";
  return (
    <>
      {/* <h1>chl to rha h</h1> */}
      <Navbar />
      {ishome && <h1 className='mt-[200px] text-red-500 kuchbhi'>Use the Navbar</h1>}
      {<Outlet />}
    </>
  )
}

export default App

