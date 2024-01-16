const {Router} = require('express')

// controllers
const {
    getAllPosts,
    addNewPost,
    deleteSinglePost,
} = require('../controllers/postsControllers')
// middlewares
// private route middleware
const {
    privateRoute,
} = require('../middlewares/privateRoutes')

const router = Router()

// get all posts
router.get('/get-all-posts',getAllPosts)

// add new post
router.post('/add-new-post',privateRoute,addNewPost)

// delete post
router.delete('/delete-single-post/:_id',privateRoute,deleteSinglePost)

module.exports = router