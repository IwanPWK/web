// use import not require, coz using module type
import express from 'express'
import { Server } from "socket.io"
import path from 'path' // setup static or frontend on the same server as the backend (host frontend with express)
import { fileURLToPath } from 'url' // fix __dirname is unknown coz using import

const __filename = fileURLToPath(import.meta.url) // fix __dirname is unknown coz using import
const __dirname = path.dirname(__filename) // fix __dirname is unknown coz using import


const PORT = process.env.PORT || 3500

const app = express()

app.use(express.static(path.join(__dirname, "public"))) // define static folder

const expressServer = app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"] // not necessary if frontend and backend are both on the same server
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)
    socket.on('message', data => {
        console.log(data)
        io.emit('message',`${socket.id.substring(0,5)}: ${data}`)
    })
})
