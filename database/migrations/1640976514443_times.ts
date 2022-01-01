import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Times extends BaseSchema {
  protected tableName = 'times'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('start_hour').notNullable()
      table.integer('end_hour').notNullable()
      table
        .integer('event_board_id')
        .notNullable()
        .references('id')
        .inTable('event_boards')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
