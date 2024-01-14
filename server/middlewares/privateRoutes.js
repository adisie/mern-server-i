const jwt = require('jsonwebtoken')

// models
// user model
const User = require('../models/usersModel')

// private routes
const privateRoute = async (req,res,next) => {
    try{
        // get token from req
        const token = req.cookies.token 
        if(!token){
            return res.status(401).json({
                error: 'unauthorized'
            })
        }
        // verify token
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        if(!decodedToken){
            return res.status(401).json({
                error: 'unauthorized'
            })
        }
        // check if user exist
        const user = await User.findById(decodedToken._id)
        if(!user){
            return res.status(401).json({
                error: 'unauthorized'
            })
        }

        req.user = {
            _id: user._id,
            username: user.username,
        }
        next()
    }catch(err){
        res.status(401).json({
            error: 'unauthorized'
        })
    }
}

module.exports = {
    privateRoute,
}