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
  events: [],
  event_title: '',
  event_date: '',
  event_theme: 'blue',
  monthOffset: 0,

  themes: [
    {
      value: 'blue',
      label: 'Tema Azul',
    },
    {
      value: 'red',
      label: 'Tema Vermelho',
    },
    {
      value: 'yellow',
      label: 'Tema Amarelo',
    },
    {
      value: 'green',
      label: 'Tema Verde',
    },
    {
      value: 'purple',
      label: 'Tema Roxo',
    },
  ],

  openEventModal: false,

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

  showEventModal(date) {
    // open the modal
    this.openEventModal = true
    this.event_date = new Date(this.year, this.month, date).toLocaleDateString('pt')
  },
  onCreateEvent(e) {
    const [day, month, year] = e.currentTarget.date.value.split('/')
    e.currentTarget.date.value = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10)
    ).toISOString()
  },
  next() {
    window.location.href = '/events?month=' + (this.monthOffset + 1)
  },
  setEvents(events) {
    events = events.map((e) => {
      return {
        event_title: e.name,
        event_date: new Date(e.date),
        event_theme: e.theme,
        event_id: e.id,
      }
    })
    this.events = events
  },
  previous() {
    window.location.href = '/events?month=' + (this.monthOffset - 1)
  },

  addEvent() {
    if (this.event_title === '') {
      return
    }

    this.events.push({
      event_date: this.event_date,
      event_title: this.event_title,
      event_theme: this.event_theme,
    })

    // clear the form data
    this.event_title = ''
    this.event_date = ''
    this.event_theme = 'blue'

    //close the modal
    this.openEventModal = false
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
