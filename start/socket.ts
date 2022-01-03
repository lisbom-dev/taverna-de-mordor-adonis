/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Board from 'App/Models/Board'
import Message from 'App/Schemas/Message'
import Ws from 'App/Services/Ws'
import IMessage from 'Contracts/interfaces/IMessage'
import Notification from 'App/Schemas/Notification'
import User from 'App/Models/User'

Ws.boot()

/**
 * Listen for incoming socket connections
 */

const chatNamespace = Ws.io.of('/chat')
const notificationNamespace = Ws.io.of('/notification')

chatNamespace.on('connection', (socket) => {
  const id = socket.handshake.query.id
  socket.join(id as string)
  socket.on('message', async (data: IMessage) => {
    const msg = await Message.create(data)
    socket.to(`${data.boardId}`).emit('message', { ...data, _id: msg._id })
    const board = await Board.find(data.boardId)
    const users = await board!
      .related('players')
      .query()
      .whereNot('board_players.player_id', data.sender.id)
    const master = await User.find(board!.masterId)
    if (master && master.id !== data.sender.id) {
      users.push(master)
    }
    await Promise.all(
      users.map(async (u) => {
        const notification = {
          sender: board!.serialize() as Board,
          subject: `Nova Mensagem de ${
            data.sender.name
          } em <a class="font-bold text-blue-600" href="/boards/${board!.id}/chat/#${msg._id}">${
            board!.name
          }</a>`,
          content: data.content,
          ownerId: u.id,
          photoUrl: data.sender.photoUrl,
        }
        await Notification.create(notification)
        notificationNamespace.to('' + u.id).emit('notification', notification)
      })
    )
  })
})

notificationNamespace.on('connection', (socket) => {
  const id = socket.handshake.query.id
  socket.join(id as string)
})
