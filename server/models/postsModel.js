const mongoose = require('mongoose')


const postsSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
    },
    filePath: {
        type: String,
    },
},{
    timestamps: true,
})

module.exports = mongoose.model('Post',postsSchema)