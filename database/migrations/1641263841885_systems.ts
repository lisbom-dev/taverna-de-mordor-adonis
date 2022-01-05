import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Systems extends BaseSchema {
  protected tableName = 'systems'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('photo_url').notNullable()
      table.string('slug').notNullable()
      table.string('website').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
