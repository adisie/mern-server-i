const {Router} = require('express')

// controllers
const {
    signup,
    login,
    logout,
    checkAuth,
    getAllUsers,
    getUsersProfiles,
} = require('../controllers/usersControllers')

// middlewares
// private routes
const {
    privateRoute,
} = require('../middlewares/privateRoutes')

const router = Router()

// signup
router.post('/signup',signup)

// login
router.post('/login',login)

// logout
router.get('/logout',logout)

// check-auth
router.get('/check-auth',privateRoute,checkAuth)

// get all users
router.get('/get-all-users',getAllUsers)

// get users and profiles
router.get('/get-users-profiles',getUsersProfiles)

module.exports = router