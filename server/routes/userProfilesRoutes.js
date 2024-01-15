const {Router} = require('express')

// controllers
const {
    addNewProfile,
    getAllProfiles,
    getAllMyProfiles,
    deleteProfile,
} = require('../controllers/userProfilesControllers')
// middlewares
// private middleware
const {
    privateRoute,
} = require('../middlewares/privateRoutes')
// file upload middleware
const {
    uploadProfile,
} = require('../middlewares/fileUpload')

const router = Router()

// new profile
router.post('/new-profile',privateRoute,uploadProfile.single('profile'),addNewProfile)

// get all profiles
router.get('/get-all-profiles',getAllProfiles)

// get all my profiles
router.get('/get-all-my-profiles',privateRoute,getAllMyProfiles)

// delete profile
router.delete('/delete-profile/:_id',privateRoute,deleteProfile)

module.exports = router