export default () => ({
  notifications: [],
  initNavbar(userId) {
    this.socket = io('/notification', { query: { id: userId } })
    this.initEvents()
    this.getNotifications()
  },
  getNotifications() {
    fetch('/notifications?limit=5').then((data) => {
      data.json().then((notifications) => {
        this.notifications = notifications
      })
    })
  },
  markAsRead(id) {
    fetch('/notifications/' + id, { method: 'PUT', body: { read: true } }).then((data) => {
      data.json().then(() => {
        const n = [...this.notifications]
        const index = n.findIndex((ni) => ni._id === id)
        n[index] = { ...n[index], read: true }
        this.notifications = n
      })
    })
  },
  get newNotifications() {
    return this.notifications.length > 0 || !!this.notifications.find((n) => n.read)
  },
  toggle() {
    this.open = !this.open
  },
  toggleNotifications() {
    this.showNotifications = !this.showNotifications
  },
  open: false,
  mobileShow: false,
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
