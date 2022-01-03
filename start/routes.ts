import Route from '@ioc:Adonis/Core/Route'
import './routes/google'

Route.get('/', 'HomeController.index')
Route.get('/login', ({ response }) => {
  response.redirect('/google/redirect')
})
Route.get('/equipe', ({ view }) => view.render('team'))
Route.get('/logout', 'SessionsController.destroy')
Route.get('/users', 'UsersController.index')
Route.post('/users', 'UsersController.store')
Route.get('/users/:id', 'UsersController.show')
Route.post('/adms/:id', 'AdmimsController.store')
Route.post('/masters/:id', 'MastersController.store')
Route.resource('events', 'EventsController').middleware({
  create: ['auth:web'],
  update: ['auth:web'],
  store: ['auth:web'],
  edit: ['auth:web'],
  destroy: ['auth:web'],
})
Route.post('/events/:event_id/boards', 'EventBoardsController.store')
Route.resource('boards', 'BoardsController').middleware({
  create: ['auth:web'],
  update: ['auth:web'],
  store: ['auth:web'],
  edit: ['auth:web'],
  destroy: ['auth:web'],
})
Route.post('/events/:event_id/comments', 'EventCommentsController.store')
Route.post('/masters/:user_id/comments', 'MasterCommentsController.store')
Route.post('/boards/:board_id/comments', 'BoardCommentsController.store')
Route.put('/comments/:id', 'CommentsController.update')
Route.delete('/comments/:id', 'CommentsController.destroy')

Route.post('/events/:event_id/ratings', 'EventStarRatingsController.store')
Route.post('/masters/:user_id/ratings', 'MasterStarRatingsController.store')
Route.post('/boards/:board_id/ratings', 'BoardStarRatingsController.store')
Route.put('/ratings/:id', 'StarRatingsController.update')
Route.delete('/ratings/:id', 'StarRatingsController.destroy')
Route.post('/boards/:board_id/players', 'BoardPlayersController.store')

Route.get('/boards/:board_id/chat', 'BoardChatsController.index').middleware(['auth:web'])
Route.get('/notifications', 'NotificationsController.index').middleware(['auth:web'])
Route.put('/notifications/:id', 'NotificationsController.index').middleware(['auth:web'])
