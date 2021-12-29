import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BoardComments extends BaseSchema {
  protected tableName = 'board_comments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('board_id').notNullable().references('id').inTable('boards')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
