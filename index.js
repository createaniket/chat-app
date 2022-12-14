const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {Generate,
    GenarateLocationMessage} = require('./Public/Utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, './Public')

const {  AddUser,
    getUserInRoom,
    GetUser,
    removeUser} = require('./Public/Utils/Users')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {

   
    console.log('New WebSocket connection')




    socket.on('join', ({username, room}, callback) =>{
        const {error, user} = AddUser({ id: socket.id, username, room})


        if(error){
    
            return callback(error)
        }

        socket.join(room) // is line matlab dekhna h

        socket.emit('message', Generate('Admin', 'Welcome'))
    socket.broadcast.to(user.room).emit('message', Generate('Admin' , `${user.username} has joined the group!`))

    io.to(user.room).emit('roomData', {

        room:user.room,
        users:getUserInRoom(user.room)
    })
    })
    

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        const user = GetUser(socket.id)
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.to(user.room).emit('message', Generate(user.username , message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {

        const user = GetUser(socket.id)
        io.to(user.room).emit('locationMessage', GenarateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {

        const user = removeUser(socket.id)

        if(user){


        io.to(user.room).emit('message', Generate('Admin', `${user.username} has left the group!`))

        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})