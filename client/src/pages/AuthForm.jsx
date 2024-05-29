import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const initialFormState = {
    username: '',
    email: '',
    password: '',
    isLogin: true

}

function AuthForm(props) {
    const [formData, setFormData] = useState(initialFormState)
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const input = event.target.name

        setFormData({
            ...formData,
            [input]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const url = `/api/auth/${formData.isLogin ? 'login' : 'register'}`

        const res = await axios.post(url, formData)

        props.setUser(res.data)
        navigate('/')

        // setFormData({...initialFormState})
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