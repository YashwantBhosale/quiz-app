import { useState } from 'react'
import Login from './pages/Login'
import {Routes, Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
