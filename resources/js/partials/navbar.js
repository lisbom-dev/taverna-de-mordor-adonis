export default () => ({
  notifications: [],
  initNavbar(userId) {
    this.socket = io('/notification', { query: { id: userId } })
    this.initEvents()
    this.getNotifications()
  },
  getNotifications() {
    fetch('/notifications').then((data) => {
      data.json().then((notifications) => {
        this.notifications = notifications
      })
    })
  },
  toggle() {
    this.open = !this.open
  },
  toggleNotifications() {
    this.showNotifications = !this.showNotifications
  },
  open: false,
  mobileShow: false,
  newNotifications: false,
  showNotifications: false,
  close() {
    this.open = false
  },
  handleMobileArea() {
    this.mobileShow = !this.mobileShow
  },
  initEvents() {
    this.socket.on('notification', (data) => {
      this.notifications.push(data)
    })
  },
})
