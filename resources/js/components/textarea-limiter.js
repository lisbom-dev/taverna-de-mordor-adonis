export default () => ({
  content: '',
  limit: 0,
  get remaining() {
    return this.limit - this.content.length
  },
})
