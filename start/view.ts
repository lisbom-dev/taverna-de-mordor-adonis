/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import View from '@ioc:Adonis/Core/View'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'

View.global('format', (date: Date, pattern: string) => {
  return format(date, pattern, {
    locale: pt,
  })
})
