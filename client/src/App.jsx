import {Routes, Route, Navigate} from 'react-router-dom'
import { useState} from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import AddProduct from './pages/AddProduct'
import WillDashboard from './pages/WillDashboard'
import Dashboard from './pages/Dashboard'
import AuthForm from './pages/AuthForm'
import ItemList from './pages/ItemsList'
import ProductPage from './pages/ProductPage'
import PrivateRoute from './PrivateRoute';
import { useAuth } from './context/AuthContext';




function App() {
  const { loggedIn } = useAuth();
  const [user, setUser] = useState(null)

  return (
    <>
    <Navbar />

    <main className="d-flex flex-column justify-content-center">
      <div className='content'>

      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/forsale" element={<ItemList />} />
        <Route 
          path="/dashboard" 
          element={<PrivateRoute element={<Dashboard />} />} 
        />
        <Route 
          path="/willdashboard" 
          element={<PrivateRoute element={<WillDashboard />} />} 
        />
        <Route 
          path="/auth" 
          element={!loggedIn ? <AuthForm /> : <Navigate to="/dashboard" />} 
        />

        <Route path="/products/:id" element={<ProductPage />} />

      </Routes>

      

      </div>
    
    </main>

    <Footer />

    </>
  )
}

export default App