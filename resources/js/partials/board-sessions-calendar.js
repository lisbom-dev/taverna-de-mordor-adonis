import { addMonths } from 'date-fns'

export default () => ({
  MONTH_NAMES: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  DAYS: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  month: '',
  year: '',
  no_of_days: [],
  blankdays: [],
  days: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  sessions: [],
  session_date: '',
  session_time: '',
  monthOffset: 0,
  openSessionModal: false,

  initDate(month = 0) {
    let today = addMonths(new Date(), month)
    this.month = today.getMonth()
    this.year = today.getFullYear()
    this.monthOffset = month
    this.datepickerValue = new Date(this.year, this.month, today.getDate()).toDateString()
  },

  isToday(date) {
    const today = new Date()
    const d = new Date(this.year, this.month, date)
    return today.toDateString() === d.toDateString() ? true : false
  },

  showSessionModal(date) {
    // open the modal
    this.openSessionModal = true
    this.session_date = new Date(this.year, this.month, date).toLocaleDateString('pt')
  },
  onCreateSession(e) {
    const [day, month, year] = e.currentTarget.date.value.split('/')
    e.currentTarget.date.value = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10)
    ).toISOString()
  },
  next(boardId) {
    window.location.href = `/boards/${boardId}?month=` + (this.monthOffset + 1)
  },
  setSessions(sessions) {
    sessions = sessions.map((s) => {
      const time = new Date(s.time * 1000).toISOString().substring(11, 16)
      console.log(time)
      return {
        session_date: new Date(s.date),
        session_time: time,
        session_id: s.id,
      }
    })
    this.sessions = sessions
  },
  previous(boardId) {
    window.location.href = `/boards/${boardId}?month=` + (this.monthOffset - 1)
  },

  addSession() {
    this.sessions.push({
      session_date: this.session_date,
      session_time: this.session_time,
    })

    // clear the form data
    this.session_date = ''
    this.session_time = ''

    //close the modal
    this.openSessionModal = false
  },

  getNoOfDays() {
    let daysInMonth = new Date(this.year, this.month + 1, 0).getDate()

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year, this.month).getDay()
    let blankdaysArray = []
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i)
    }

    let daysArray = []
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i)
    }

    this.blankdays = blankdaysArray
    this.no_of_days = daysArray
  },
})
