const multer = require('multer')
const fs = require('fs')


// create folder
const createFolder = (req,file) => {
    let path = `./public/uploads/profiles/${req.user.username}`
    if(!fs.existsSync(path)){
        fs.mkdirSync(path,{recursive: true})
    }
    return path
}

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,createFolder(req,file))
    },
    filename: function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    },
})

const uploadProfile = multer({storage})


module.exports = {
    uploadProfile,
}