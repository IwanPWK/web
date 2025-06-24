const ws = require('ws') //install websocket
const server = new ws.server({port: '3000'}) //define server

server.on('connection', socket => {
    socket.on('message', message => {
        console.log(message)
        socket.send(`${message}`)
    })
})