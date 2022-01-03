import '../css/app.css'
import Alpine from 'alpinejs'
import axios from 'axios'
import navbar from './partials/navbar'
import alert from './components/alert'
import calendar from './partials/calendar'
import IMask from 'imask'
import io from 'socket.io-client'
import chat from './chat'

Alpine.data('navbar', navbar)
Alpine.data('alert', alert)
Alpine.data('calendar', calendar)
Alpine.data('chat', chat)
window.Alpine = Alpine
window.IMask = IMask
Alpine.start()
window.axios = axios.create({ baseURL: '/' })
window.io = io
