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

import { HttpContext } from '@adonisjs/core/build/standalone'
import Route from '@ioc:Adonis/Core/Route'
import PostsController from './../app/Controllers/Http/PostsController';
/*
Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
*/


Route.patch('/users/update', 'UsersController.update').as('user.update') // update user
// Route.get('/', () => {
//   return 'Hello world2'
// })

Route.get('/about', () => {
  return 'this is about page'
})

Route.get('/posts/:id?', async (ctx) => {
  console.log(ctx);
  const { params } = ctx
  return params.id ? `Viewing post with id ${params.id}` : '404 error by -NRI'
}).where('id', /^[0-9]+$/)

Route.get('/posts/topics/:topic?', async ({ params }) => {
  return params.topic ? `hello post with topic ${params.topic}` : '405 error by -NRI'
})

Route.get('docs/*', ({ params }) => {
  console.log(params['*'])
})


// Route.get('/users', ({ params }) => {
//   const url = Route.makeUrl('user.show', { id:  params.id})
//   return url;
// }).as('user.show')
// Route.get('user.show')
// const url = Route.makeUrl('UsersController.show', { id: 1 })


Route.get('/params/:id', async ({ params,request }) => {
  console.log(params)
  console.log(request.qs())
  return params.id
})

Route.post('/users/add', 'UsersController.store').as('user.store') // insert into user 
Route.post('/posts/add', 'PostsController.store').as('post.store') // insert into post

Route.get('/users/select', 'UsersController.index').as('user.index')
Route.get('/posts/select', 'PostsController.index').as('post.index') // get all posts

// Route.put('/users/update', 'UsersController.update').as('user.update') // update user

Route.delete('/users/delete', 'UsersController.destroy').as('user.delete') // delete user