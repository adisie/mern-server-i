// models
// post modles 
const Post = require('../models/postsModel')

// get all posts
const getAllPosts = async (req,res) => {
    try{
        const posts = await Post.find().sort({createdAt: -1}).select({
            _id: 1,
            authorId: 1,
            text: 1,
            createdAt: 1
        })
        res.status(200).json({
            posts
        })
    }catch(err){
        res.status(400).json({
            error: 'get all posts error'
        })
    }
}

// add new post
const addNewPost = async (req,res) => {
    try{
        const {text} = req.body 
        const newPost = await Post.create({
            authorId: req.user._id,
            text,
        })
        res.status(200).json({
            post: {
                _id: newPost._id,
                authorId: newPost.authorId,
                text: newPost.text,
                createdAt: newPost.createdAt,
            }
        })
    }catch(err){
        res.status(400).json({
            error: 'add new post error'
        })
    }
}

// delete post
const deleteSinglePost = async (req,res) => {
    try{
        const {_id} = req.params 
        const post = await Post.findById(_id)
        if(!post) {
            return res.status(400).json({
                error: 'post not exist'
            })
        }
        if(post.authorId.toString() !== req.user._id.toString()){
            return res.status(400).json({
                error: 'unauthorized to delete other\'s post'
            })
        }
        await post.deleteOne()
        res.status(200).json({
            message: 'the post is deleted',
            _id,
        })
    }catch(err){
        res.status(400).json({
            error: 'delete single post error'
        })
    }
}


module.exports = {
    getAllPosts,
    addNewPost,
    deleteSinglePost,
}