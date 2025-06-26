// 3 use import not require, coz using module type
import express from 'express' // 3
import { Server } from "socket.io" // 3
import path from 'path' // 3 setup static or frontend on the same server as the backend (host frontend with express)
import { fileURLToPath } from 'url' // 3 fix __dirname is unknown coz using import

const __filename = fileURLToPath(import.meta.url) // 3 fix __dirname is unknown coz using import
const __dirname = path.dirname(__filename) // 3 fix __dirname is unknown coz using import


const PORT = process.env.PORT || 3500 // 3

const app = express() // 3

app.use(express.static(path.join(__dirname, "public"))) // 3 define static folder

// 3
const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

const io = new Server(
    expressServer, // 3
    {
        cors: {
            origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"] // not necessary if frontend and backend are both on the same server
        }
    })

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    // 4 Upon connection - only to user, when a user connects
    socket.emit('message', "Welcome to Chat App!")

    // 4 Upon connection - to all others (except the user)
    socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)} connected`)

    // 4 Listening for a message event
    socket.on('message', data => {
        console.log(data)
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
    })

    // 4 When user disconnects - to all others
    socket.on('disconnect', ()=> {
        socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)} disconnected`)
    })

    // 4 Listen for activity
    socket.on('activity', name => {
        socket.broadcast.emit('activity', name)
    })
})
