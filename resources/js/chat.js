export default () => ({
  /**
   * @type {import('socket.io-client').Socket||undefined}
   */
  socket: undefined,
  messages: [],
  text: '',
  initChat(boardId, user, messages) {
    console.log(messages)
    this.socket = io()
    this.boardId = boardId
    this.user = user
    this.initEvents()
  },
  sendMessage(text) {
    console.log(text)
    this.socket.emit('text', { content: text, boardId: this.boardId, user: this.user })
  },
  addMessageToChat(message) {
    this.messages.push(message)
  },
  initEvents() {
    this.socket.on('message', this.addMessageToChat)
  },
})
