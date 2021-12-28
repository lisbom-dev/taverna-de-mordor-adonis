export default () => ({
  toggle() {
    this.open = !this.open
  },
  open: false,
  close() {
    this.open = false
  },
  handleProfileManagement() {
    console.log('ook')
  },
  handleMobileArea() {
    console.log('kook')
  },
})
