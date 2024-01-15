const mongoose = require('mongoose')

const userProfilesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    profilePath: {
        type: String,
    },
},{
    timestamps: true,
})

module.exports = mongoose.model('Profile',userProfilesSchema)