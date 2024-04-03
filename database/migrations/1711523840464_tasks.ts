import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tasks extends BaseSchema {
  protected tableName = 'tasks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.timestamps(true, true) // Sets default values for created_at and updated_at
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
