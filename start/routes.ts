/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import './routes/google'

Route.get('/', 'HomeController.index')
Route.get('/login', ({ response }) => {
  response.redirect('/google/redirect')
})
Route.get('/equipe', ({ view }) => view.render('team'))
Route.get('/logout', 'SessionsController.destroy')
Route.get('/users', 'UsersController.index')
Route.get('/users/:id', 'UsersController.show')
Route.post('/adms/:id', 'AdmimsController.store')
Route.post('/masters/:id', 'MastersController.store')
Route.resource('events', 'EventsController').middleware({
  edit: ['auth:web'],
  destroy: ['auth:web'],
})
