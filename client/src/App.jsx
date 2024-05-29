import {Routes, Route} from 'react-router-dom'
import { useState} from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import AuthForm from './pages/AuthForm'


function App() {
  const [user, setUser] = useState(null)



  return (
    <>
    <Navbar />

    <main>
      <div className='content'>

      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth" element={<AuthForm setUser={setUser}/>} />
      </Routes>

      </div>
    
    </main>

    <Footer />

    </>
  )
}

export default App