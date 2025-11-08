import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ConversorDivisa } from './components/ConversorDivisa'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ConversorDivisa />
    </>
  )
}

export default App
