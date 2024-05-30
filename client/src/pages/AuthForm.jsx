import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CREATE_USER, LOGIN_USER } from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import { useAuth } from '../context/AuthContext'

const initialFormState = {
  username: '',
  email: '',
  password: '',
  isLogin: true
}

function AuthForm() {
  const [formData, setFormData] = useState(initialFormState)
  const navigate = useNavigate()
  const { login } = useAuth() // Access the login function from the context

  const [createUser] = useMutation(CREATE_USER, {
    variables: formData
  })
  const [loginUser] = useMutation(LOGIN_USER, {
    variables: formData
  })

  const handleInputChange = (event) => {
    const input = event.target.name

    setFormData({
      ...formData,
      [input]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    let data;
    let token;
    try {
      if (formData.isLogin) {
        data = await loginUser()
        token = data.data.login.token
      } else {
        data = await createUser()
        token = data.data.createUser.token
      }

      // Log to check if data is received
      console.log('Data received:', data)
      
      // If login or registration is successful, update the context and navigate
      if (data) {
        login(token, () => {
          navigate('/dashboard');
        })
      
      } else {
        console.error('Error: Data not received')
      }
    } catch (error) {
      console.error('Authentication error:', error)
    }
    setFormData({...initialFormState})

  }

  const toggleAuthType = () => {
    setFormData({
      ...formData,
      isLogin: !formData.isLogin
    })
  }

  return (
    <section id="contact-me">
      <h2>{formData.isLogin ? 'Log In' : 'Register'}</h2>
      <h3>{formData.isLogin ? 'Log in to your account now' : 'Register an account with us.'}</h3>
      <div id="form-section">
        <form onSubmit={handleSubmit}>
          {!formData.isLogin && (
            <input
              onChange={handleInputChange}
              name="username"
              type="username"
              value={formData.username}
              placeholder="Enter your username" required />
          )}

          <input
            onChange={handleInputChange}
            name="email"
            type="email"
            value={formData.email}
            placeholder="Enter your email" required />

          <input
            onChange={handleInputChange}
            name="password"
            type="password"
            value={formData.password}
            placeholder="Enter your password" required />

          <div className="auth-toggle-wrap">
            <span>Login</span>
            <div onClick={toggleAuthType} className="toggle-bar">
              <span className={`toggle-switch ${!formData.isLogin ? 'toggle' : ''}`}></span>
            </div>
            <span>Register</span>
          </div>

          <button>Submit</button>
        </form>
      </div>
      <h5 id="contact-me-h5">{formData.isLogin ? 'Welcome back, you know what to do' : 'Quickly fill out form to create account!'}</h5>
    </section>
  )
}

export default AuthForm
