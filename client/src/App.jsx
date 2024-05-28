
import { NavLink } from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'
import { useEffect, useState} from 'react'
import axios from 'axios'

import Footer from './components/Footer'

import Home from './pages/Home'
import About from './pages/About'
import AuthForm from './pages/AuthForm'


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
      axios.get('/api/auth')
          .then(res => {
              setUser(res.data.user)
          })
  }, [])

  const logoutUser = async () => {
      await axios.get('/api/auth/logout')

      setUser(null)
  }

  return (
    <>
    <header>
      <div className='brand'>
        <NavLink to='/'>
            <img src='react.svg'></img>
        </NavLink>

        <nav>
            <NavLink to="/about">About Us</NavLink>
            {user ? (
                <button onClick={logoutUser}>Logout</button>
            ) : (
                <NavLink to="/auth">Login/Register</NavLink>
            )}
        </nav>
      </div>
    </header>

    <main>
      <div className='content'>

      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<AuthForm setUser={setUser}/>} />
      </Routes>

      </div>
    
    </main>

    <Footer />

    </>
  )
}

export default App