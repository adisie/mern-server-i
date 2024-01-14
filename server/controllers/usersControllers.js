const bcryptjs = require('bcryptjs')

// models
// user model
const User = require('../models/usersModel')

// utils
const {
    MAX_AGE,
    errorHandler,
    generateToken,
} = require('../utils/usersUtils')

// signup
const signup = async (req,res) => {
    try{
        const {username,email,password} = req.body 
        const user = await User.create({username,email,password})
        // generate token 
        const token = generateToken(user._id)
        // set cookie
        res.cookie('token',token,{
            maxAge: MAX_AGE * 1000,
            httpOnly: true,
            sameSite: 'lax',
            secure: true
        })
        res.status(200).json({
            user: {
                _id: user._id,
                username: user.username
            }
        })
    }catch(err){
        const errors = errorHandler(err)
        res.status(400).json({errors})
    }
}

// login
const login = async (req,res) => {
    try{
        const {username,password} = req.body 
        // username checker
        if(!username?.trim()){
            throw new Error('username required')
        }
        // password checker
        if(!password){
            throw new Error('password required')
        }
        // find user
        const user = await User.findOne({username})
        // check is user exist
        if(!user){
            throw new Error('username not exist')
        }
        // check if password is correct
        const isPassMatch = bcryptjs.compareSync(password,user.password)
        if(!isPassMatch){
            throw new Error('incorrect password')
        }
        // generate token
        const token = generateToken(user._id)
        // set cookie
        res.cookie('token',token,{
            maxAge: MAX_AGE * 1000,
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
        })
        res.status(200).json({
            user: {
                _id: user._id,
                username: user.username,
            }
        })
    }catch(err){
        const errors = errorHandler(err)
        res.status(200).json({errors})
    }
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