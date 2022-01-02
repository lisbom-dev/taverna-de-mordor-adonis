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
  sendMessage(text) {
    if (text !== '') {
      this.text = ''
      const message = { content: text, boardId: this.boardId, sender: this.user }
      this.socket.emit('message', message)
      this.addMessageToChat(message)
    }
  },
  addMessageToChat(message) {
    this.messages.push(message)
  },
  initEvents() {
    this.socket.on('message', (data) => {
      this.addMessageToChat(data)
    })
  },
  onMessageAdded() {
    this.$refs.message_field.scrollTop = this.$refs.message_field.scrollHeight
  },
})
