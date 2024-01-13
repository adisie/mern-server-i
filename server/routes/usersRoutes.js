const {Router} = require('express')

// controllers
const {
    signup,
    login,
    logout,
    checkAuth,
    getAllUsers,
} = require('../controllers/usersControllers')

const router = Router()

// signup
router.post('/signup',signup)

// login
router.post('/login',login)

// logout
router.get('/logout',logout)

// check-auth
router.get('/check-auth',checkAuth)

// get all users
router.get('/get-all-users',getAllUsers)

module.exports = router