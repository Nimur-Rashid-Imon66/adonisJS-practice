import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post';

export default class PostsController {
  public async index({response}: HttpContextContract) {
    const posts = await Post.query()
    return response.json({posts});
  }
  
  public async store({ request }: HttpContextContract) {
    
    const post = new Post()
    const data = request.only(['post_title', 'content', 'author_name'])
    await post.merge(data).save()
    
    return post;
  }
  
  public async create({ }: HttpContextContract) {}
  public async show({ }: HttpContextContract) {}
  public async edit({ }: HttpContextContract) {}
  public async update({ }: HttpContextContract) {}
  public async destroy({ }: HttpContextContract) {}
}
