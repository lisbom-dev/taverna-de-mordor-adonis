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
import User from 'App/Models/User'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
Route.get('/google/redirect', async ({ ally }) => {
  return ally.use('google').redirect()
})
Route.get('/google/callback', async ({ ally, auth }) => {
  const google = ally.use('google')

  /**
   * User has explicitly denied the login request
   */
  if (google.accessDenied()) {
    return 'Access was denied'
  }

  /**
   * Unable to verify the CSRF state
   */
  if (google.stateMisMatch()) {
    return 'Request expired. Retry again'
  }

  /**
   * There was an unknown error during the redirect
   */
  if (google.hasError()) {
    return google.getError()
  }

  /**
   * Finally, access the user
   */
  const googleUser = await google.user()
  const user = await User.firstOrCreate(
    {
      email: googleUser.email as string,
    },
    {
      name: googleUser.name,
    }
  )

  await auth.use('web').login(user)
})
