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

  next() {
    window.location.href = '/boards/sections?month=' + (this.monthOffset + 1)
  },

  previous() {
    window.location.href = '/boards/sections?month=' + (this.monthOffset - 1)
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
