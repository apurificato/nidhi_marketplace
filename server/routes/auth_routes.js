const router = require('express').Router()
const { sign, verify } = require('jsonwebtoken')

const User = require('../models/User')

function createToken(user_id) {
    const token = sign({ user_id }, process.env.JWT_SECRET)

    return token
}

// Check if user is authenticated/logged in by pulling cookie and verifying that their JWT is valid
router.get('/', async (req,res) => {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.json({
                user: null
            })
        }

        const data = verify(req.cookies?.token, process.env.JWT_SECRET)

        const user = await User.findById(data.user_id)

        res.json({
            user: user
        })
    } catch (error) {
        console.log(error)

        res.status(401).json({
            user: null
        })
    }
})

// Register User
router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body)

        const token = createToken(user._id)

        res.cookie('token', token, {
            httpOnly: true,
            // maxAge: 30000
        })

        res.json(user)
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: 'Server error'
        })
    }
})

// Log User In
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user) return res.status(403).json({
            message: 'User not found with that email address.'
        })

        const valid_pass = await user.validatePass(password)

        if (!valid_pass) return res.status(401).json({
            message: 'Password is invalid. Please try again.'
        })

        const token = createToken(user._id)

        res.cookie('token', token, {
            httpOnly: true,
            // maxAge: 30000
        })

        res.json(user)
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: 'Server error'
        })
    }
})

// Log User Out
router.get('/logout', (req, res) => {
    res.clearCookie('token')

    res.json({
        message: 'User logged out successfully'
    })
})


module.exports = router