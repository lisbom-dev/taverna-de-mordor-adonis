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

  next(boardId) {
    window.location.href = `/boards/${boardId}?month=` + (this.monthOffset + 1)
  },
  setSessions(sessions) {
    sessions = sessions
      .map((s) => {
        const time = new Date(s.time * 1000).toISOString().substring(11, 16)
        const timeWithPeriod =
          parseInt(time.substring(0, 2), 10) >= 12 ? time + ' PM' : time + ' AM'
        return {
          session_date: new Date(s.date),
          session_time: timeWithPeriod,
          session_id: s.id,
          session_event_id: s.event_id,
        }
      })
      .sort((a, b) => {
        if (
          new Date(a.session_date.toString().replace(/-/g, '/')).getTime() + a.session_time <
          new Date(b.session_date.toString().replace(/-/g, '/')).getTime() + b.session_time
        ) {
          return -1
        } else {
          return 0
        }
      })

    this.sessions = sessions
  },
  previous(boardId) {
    window.location.href = `/boards/${boardId}?month=` + (this.monthOffset - 1)
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
