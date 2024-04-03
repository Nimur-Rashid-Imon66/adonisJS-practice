import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('post_title').notNullable()
      table.text('content')
      table.string('author_name').notNullable()
      table.timestamps(true, true)
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
