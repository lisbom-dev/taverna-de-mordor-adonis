import { format } from 'date-fns'
import { pt } from 'date-fns/locale'

export default () => ({
  /**
   * @type {import('socket.io-client').Socket||undefined}
   */
  socket: undefined,
  messages: [],
  text: '',
  initChat(boardId, user, messages) {
    this.$watch('messages', () => {
      this.onMessageAdded()
    })
    this.messages = messages
    this.socket = io('/chat', { query: { id: boardId }, forceNew: true })
    this.boardId = boardId
    this.user = user
    this.initEvents()
  },
  /**
   * @param {string} text
   */
  sendMessage(text) {
    text = text.trim()
    if (text !== '') {
      this.text = ''
      const message = {
        content: text,
        boardId: this.boardId,
        sender: this.user,
        createdAt: new Date(),
        created_at: format(new Date(), 'hh:mm', { locale: pt }),
      }
      this.socket.emit('message', message)
      this.addMessageToChat(message)
    } else {
      this.text = ''
    }
  },
  addMessageToChat(message) {
    this.messages.push(message)
  },
  initEvents() {
    this.socket.on('message', (data) => {
      this.addMessageToChat({
        ...data,
        createdAt: new Date(data.createdAt),
        created_at: format(new Date(data.createdAt), 'hh:mm', { locale: pt }),
      })
    })
  },
  onMessageAdded() {
    this.$refs.message_field.scrollTop = this.$refs.message_field.scrollHeight
  },
})
