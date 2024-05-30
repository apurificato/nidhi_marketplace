import {Routes, Route, Navigate} from 'react-router-dom'
import { useState} from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import AuthForm from './pages/AuthForm'
import PrivateRoute from './PrivateRoute';
import { useAuth } from './context/AuthContext';


function App() {
  const { loggedIn } = useAuth();
  const [user, setUser] = useState(null)

  return (
    <>
    <Navbar />

    <main>
      <div className='content'>

      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/about" element={<About />} />
        <Route 
          path="/dashboard" 
          element={<PrivateRoute element={<Dashboard />} />} 
        />
        <Route 
          path="/auth" 
          element={!loggedIn ? <AuthForm /> : <Navigate to="/dashboard" />} 
        />
      </Routes>

      </div>
    
    </main>

    <Footer />

    </>
  )
}

export default App