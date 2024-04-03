import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema,rules} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'


export default class UsersController {

    public async index({ response }: HttpContextContract) {
        // ------ get all users ------
        // const users = await User.all()
        // return response.json({users})
        
        // ------ get user by id ------
        // const individuals = await User.find(1)
        // return response.json({individuals})
        
        // const individuals = await User.findOrFail(1)
        // return response.json({individuals})

        // ------ where clause ------
        // const individuals = await User.findBy('name', 'Sultan')
        // return response.json({individuals})

        // const selectedIndividuals = await User.findMany([1, 2])
        // return response.json({selectedIndividuals})

    

        // ------ Query ------
        // const selectAll = await User.query().where('id', '=', Database.from('users').select('id').orderBy('id' ,'desc').limit(1)) // User.query().where('id', '>', )
        // return response.json(selectAll)

        // -------- right join ------
        const selectAll = await Database.from(
            Database
                .from('users as a')
                .rightJoin('posts as b', 'a.name', 'b.author_name')
                .select('a.id', 'a.name', 'a.created_at as userCreated', 'b.content', 'b.post_title', 'b.created_at as postCreated')
                .as('newTable')
        ).select('*')
        
        return response.json(selectAll)
        
        
        // const sql = 
        // `
        // SELECT * FROM (
        //     SELECT 
        //       a.id, 
        //       a.name, 
        //       a.created_at AS userCreated, 
        //       b.content, 
        //       b.post_title, 
        //       b.created_at AS postCreated 
        //     FROM 
        //       users AS a 
        //     Left JOIN 
        //       posts AS b 
        //     ON 
        //       a.name = b.author_name
        //     where b.content is not null
        //   ) AS joined_table

        // `
        // const selectAll = await Database.rawQuery(sql)
        // return response.json(selectAll[0])




        // ------ Query with where clause ------
        // const individuals = await User.query().where('name', 'Sultan')
        // return response.json({individuals})
                // IN method
        // const individualsTwo = await User.query().where('name', 'Sultan').orWhere('name', 'Main') // optional selection (IN)
        // return response.json({ individualsTwo })
        
        // const individualsTwo = await User.query().whereIn('name', ['Sultan','Main']) // another optional selection (IN)
        // return response.json({individualsTwo})
          
            //Like Method
        // const individualsTwo = await User.query().where('name','like', '%an')
        // return response.json({ individualsTwo })
        
        // ⚠️.whereLike() method not working. Don't know why
        // const individualsTwo = await User.query().whereLike('name', '%an')
        // return response.json({individualsTwo})
        

        // selet those user whose age > 20 


    }
    
    public async store({request}: HttpContextContract) {
        const user = new User()
        // way1
        // user.name = 'Main'
        // user.email = 'main@gmail.com'

        // await user.save()
        // return user;


        // way2
        // user.merge({
        //     name: 'Sultan',
        //     email: 'sul@gmail.com'
        // })
        // await user.save()
        // return user;


        // way3
        
         
        const newSchema = schema.create({
            name:schema.string(),
            email: schema.string({}, [
                rules.email(),
              ])
        })
        const msg = {
            'email.email': 'Invalid email address',
            'name.required': 'Name is required',
            'email.required': 'Email is required',
           
        }
        const data = request.only(['name', 'email'])
        try {
            const payload = await request.validate({ schema: newSchema, messages: msg })
            await user.merge(payload).save()
            

        }
        catch(error){
            console.log(error.messages)
        }
       
    }

    public async update({request ,response }: HttpContextContract) {
       
        // const user = await User.find(1)
        // if(user){
        // user.name = 'Sultan Arafin'
        // user.email = 'sultan@gamil.com'

        //     user.save()
        // }
        // return response.json({user});



        //using   query builder
        
        const newSchema = schema.create({
            email: schema.string({}, [rules.email()])
        })
        const msg = {
            'email.email': 'Invalid email address',
            'email.required': 'Email is required'
        }
        const email = request.only(['email'])
        try {
            const payload = await request.validate({ schema: newSchema , messages: msg})
            const user = await User.query()
                                    .where('id', 6)
                                    .update({ 'email': payload.email}) // update id =  6
            
            return response.json({ user })
        }
        catch (error) {
            console.log(error.messages)
        }
        
        
        return 'update failed'
    }

    public async destroy({ response}: HttpContextContract) {

        const user = await User.query()
                                .where('id', 7)
                                .delete() // delete id =  7
        return response.json(user)
        
    }


}
