export default () => ({
  toggle() {
    this.open = !this.open
  },
  open: false,
  mobileShow: false,
  close() {
    this.open = false
  },
  handleProfileManagement() {
    console.log('ook')
  },
  handleMobileArea() {
    this.mobileShow = !this.mobileShow
  },
})
