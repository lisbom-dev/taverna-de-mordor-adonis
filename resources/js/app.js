import '../css/app.css'
import Alpine from 'alpinejs'
import axios from 'axios'
import navbar from './partials/navbar'
import alert from './components/alert'

console.log(Alpine)

Alpine.data('navbar', navbar)
Alpine.data('alert', alert)

window.Alpine = Alpine

Alpine.start()
window.axios = axios.create({ baseURL: '/' })
