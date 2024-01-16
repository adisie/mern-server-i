// models
// post modles 
const Post = require('../models/postsModel')

// get all posts
const getAllPosts = (req,res) => {
    res.status(200).json('GET ALL POSTS')
}

// add new post
const addNewPost = (req,res) => {
    res.status(200).json("ADD NEW POST")
}

// delete post
const deleteSinglePost = (req,res) => {
    res.status(200).json('DELETE POST')
}


module.exports = {
    getAllPosts,
    addNewPost,
    deleteSinglePost,
}