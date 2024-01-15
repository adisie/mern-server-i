const fs = require('fs')
// models
const Profile = require('../models/userProfilesModel')

// add new profile
const addNewProfile = async (req,res) => {
    try{
        const newProfile = await Profile.create({
            userId: req.user._id,
            profilePath: req.file.path
        })
        res.status(200).json({
            profile: {
                _id: newProfile._id,
                userId: newProfile.userId,
                profilePath: newProfile.profilePath,
                createdAt: newProfile.createdAt,
            }
        })
    }catch(err){
        res.status(400).json({
            error: 'new profile error'
        })
    }
}


// get all profiles
const getAllProfiles = async (req,res) => {
    try{
        const profiles = await Profile.find().sort({createdAt: -1}).select({
            _id: 1,
            userId: 1,
            profilePath: 1,
            createdAt: 1
        })
        res.status(200).json({profiles})
    }catch(err){
        res.status(400).json({
            error: 'get all profiles error'
        })
    }
}

// get all my profiles
const getAllMyProfiles = async (req,res) => {
    try{
        const profiles = await Profile.find({userId: req.user._id}).sort({createdAt: -1}).select({
            _id: 1,
            userId: 1,
            profilePath: 1,
            createdAt: 1
        })
        res.status(200).json({profiles})
    }catch(err){
        res.status(400).json({
            error: 'get all profiles error'
        })
    }
}

// delete profile
const deleteProfile = async (req,res) => {
    try{
        const profileId = req.params._id 
        const profile = await Profile.findById(profileId)
        if(!profile){
            return res.status(400).json({
                error: 'profile not exist'
            })
        }

        if(profile.userId.toString() !== req.user._id.toString()){
            return res.status(400).json({
                error: 'can\'t delete other\'s profile'
            })
        }

        await Profile.findOneAndDelete({_id: profileId})

        if(fs.existsSync(`./${profile.profilePath}`)){
            fs.unlinkSync(`./${profile.profilePath}`)
        }

        res.status(200).json({
            message: 'profile deleted',
            _id: profileId
        })
    }catch(err){
        res.status(200).json({
            error: 'delete profile error'
        })
    }
}


module.exports = {
    addNewProfile,
    getAllProfiles,
    getAllMyProfiles,
    deleteProfile,
}