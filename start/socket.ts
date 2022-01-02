/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Message from 'App/Schemas/Message'
import Ws from 'App/Services/Ws'
Ws.boot()
console.log('slasss')

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.on('message', async (data) => {
    const message = await Message.create(data)
    console.log(data)
    console.log(message)
    socket.broadcast.emit('message', data)
  })
})
