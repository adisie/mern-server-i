const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcryptjs = require('bcryptjs')

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'username required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true,'email required'],
        validate: [isEmail,'invalid email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true,'password required'],
        minlength: [3,'too short password'],
    },
},{
    timestamps: true,
})

usersSchema.pre('save',function(next){
    this.password = bcryptjs.hashSync(this.password,10)
    next()
})

module.exports = mongoose.model('User',usersSchema)