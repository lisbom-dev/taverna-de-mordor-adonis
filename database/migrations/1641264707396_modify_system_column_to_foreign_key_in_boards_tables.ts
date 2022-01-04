import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Boards extends BaseSchema {
  protected tableName = 'boards'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('system')
      table
        .integer('system_id')
        .references('id')
        .inTable('systems')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('system_id')
      table.string('system').notNullable()
    })
  }
}
