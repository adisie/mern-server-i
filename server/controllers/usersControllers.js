const bcryptjs = require('bcryptjs')

// models
// user model
const User = require('../models/usersModel')

// profiles model
const Profile = require('../models/userProfilesModel')

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
        const profiles = await Profile.find({userId: user._id}).sort({createdAt: -1}).select({
            _id: 1,
            userId: 1,
            profilePath: 1,
            createdAt: 1
        })

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
            },
            profiles,
        })
    }catch(err){
        const errors = errorHandler(err)
        res.status(200).json({errors})
    }
}

// logout
const logout = (req,res) => {
    try{
        res.cookie('token','',{maxAge: 1})
        res.status(200).json({
            message: 'logged out'
        })
    }catch(err){
        res.status(400).json({
            error: 'logout error'
        })
    }
}

// check-auth
const checkAuth = (req,res) => {
    res.status(200).json({
        messahe: 'authorized',
        user: req.user,
    })
}

// get all users
const getAllUsers = async (req,res) => {
    try{
        const users = await User.find().select({_id: 1,username: 1,email: 1})
        res.status(200).json({users})
    }catch(err){
        res.status(400).json({
            error: 'get all users error'
        })
    }
}

// get users and profiles
const getUsersProfiles = async (req,res) => {
    try{
        const usersProfiles = await User.aggregate([
            {
                $lookup: {
                    from: 'profiles',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'profiles'
                },
            },
            {
                $project: {
                    _id: 1,
                    profiles: {
                        profilePath: 1,
                    }
                }
            }
        ])
        res.status(200).json({usersProfiles})
    }catch(err){
        res.status(400).json({
            error: 'get users and profiles error'
        })
    }
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth,
    getAllUsers,
    getUsersProfiles,
}