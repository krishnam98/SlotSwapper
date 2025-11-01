import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import Notifications from './pages/Notifications'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

      <main className="p-4 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<ProtectedRoute><Header /><Dashboard /></ProtectedRoute>} />
          <Route path="/marketplace" element={<ProtectedRoute><Header /><Marketplace /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Header /><Notifications /></ProtectedRoute>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
