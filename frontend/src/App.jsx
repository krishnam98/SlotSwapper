import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      {/* <AuthPage /> */}
      <Dashboard />

    </>
  )
}

export default App
