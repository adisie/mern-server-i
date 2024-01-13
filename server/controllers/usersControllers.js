
// models
// user model
const User = require('../models/usersModel')

// signup
const signup = (req,res) => {
    try{
        const {username,email,password} = req.body 
        res.status(200).json({username,email,password})
    }catch(err){
        res.status(400).json({
            error: 'signup error'
        })
    }
}

// login
const login = (req,res) => {
    res.status(200).json('LOGIN')
}

// logout
const logout = (req,res) => {
    res.status(200).json('LOGOUT')
}

// check-auth
const checkAuth = (req,res) => {
    res.status(200).json('CHECK-AUTH')
}

// get all users
const getAllUsers = (req,res) => {
    res.status(200).json('GET-ALL-USERS')
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth,
    getAllUsers,
}