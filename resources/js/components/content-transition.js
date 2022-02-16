export default () => ({
  contentId: 1,
  openModal: false,
  modifyContent(id) {
    this.contentId = id
  },
  showModal() {
    this.openModal = true
  },
})
