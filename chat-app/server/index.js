const ws = require('ws') //install websocket
const server = new ws.Server({port: '3000'}) //define server

server.on('connection', socket => {
    socket.on('message', message => {
        const b = Buffer.from(message)
        console.log(b.toString())
        socket.send(`${message}`)
    })
})