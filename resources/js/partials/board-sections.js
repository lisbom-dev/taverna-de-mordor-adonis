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
  sections: [],
  section_date: '',
  monthOffset: 0,

  openSectionModal: false,

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

  showSectionModal(date) {
    // open the modal
    this.openSectionModal = true
    this.section_date = new Date(this.year, this.month, date).toLocaleDateString('pt')
  },
  onCreateSection(e) {
    const [day, month, year] = e.currentTarget.date.value.split('/')
    e.currentTarget.date.value = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10)
    ).toISOString()
  },
  next() {
    window.location.href = '/boards?month=' + (this.monthOffset + 1)
  },
  setSections(sections) {
    sections = sections.map((e) => {
      return {
        section_date: new Date(e.date),
        section_id: e.id,
      }
    })
    this.sections = sections
  },
  previous() {
    window.location.href = '/boards?month=' + (this.monthOffset - 1)
  },

  addSection() {
    this.sections.push({
      section_date: this.section_date,
    })

    // clear the form data
    this.section_date = ''

    //close the modal
    this.openSectionModal = false
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
