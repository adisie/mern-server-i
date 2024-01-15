require('dotenv').config()
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express()

// settings
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000',],
    credentials: true,
}))

const server = http.createServer(app)

// mongoose connection
mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('CONNECTED')
        server.listen(process.env.PORT,()=>{
            console.log("LISTENING")
        })
    })
    .catch(err=>{
        console.log(err)
        process.exit(-1)
    })

const io = socketio(server,{
    cors: {
        origin: ['http:localhost:3000',]
    }
})

io.on('connection',socket=>{
    console.log(socket.id)
})

// routes
// users routes
app.use('/api/users',require('./routes/usersRoutes'))
app.use('/api/profiles',require('./routes/userProfilesRoutes'))
app.use('/public',express.static('public'))

