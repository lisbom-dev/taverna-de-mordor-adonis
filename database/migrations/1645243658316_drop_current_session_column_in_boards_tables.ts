import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Boards extends BaseSchema {
  protected tableName = 'boards'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('current_section')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('current_session')
    })
    this.defer(async (db) => {
      const boards = await db.from('boards')
      boards.forEach(async (b) => {
        await db.knexRawQuery('UPDATE boards SET current_session = ? WHERE id = ?', [0, b.id])
      })
    })
    this.schema.alterTable(this.tableName, (table) => {
      table.dropNullable('current_session')
    })
  }
}
