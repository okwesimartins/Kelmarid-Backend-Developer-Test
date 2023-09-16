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
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Route.get('/', async () => {
//   return { hello: 'world' }
// })
//login user
Route.post('/login-user', 'UsersController.login');

//books routes
Route.group(()=>{
  // Route.get('/list', 'BooksController.show')
  Route.post('/create', 'BooksController.store')
  // Route.put('/update/:id', 'BooksController.update')
  
}).prefix('book').middleware('auth');

//authors routes
Route.group(()=>{
  Route.get('/list', 'AuthorsController.show')
  Route.put('/update/:id', 'AuthorsController.update')
  Route.delete('/delete/:id', 'AuthorsController.delete')
}).prefix('author').middleware('auth');


