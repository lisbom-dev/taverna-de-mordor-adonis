import '../css/app.css'
import Alpine from 'alpinejs'
import axios from 'axios'
import navbar from './partials/navbar'

console.log(Alpine)

Alpine.data('navbar', navbar)

window.Alpine = Alpine

Alpine.start()
window.axios = axios.create({ baseURL: '/' })
