import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Events extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.time('hours')
    })

    this.defer(async (db) => {
      const events = await db.from('events')

      await Promise.all(
        events.map(async (e) => {
          await db.knexRawQuery(`UPDATE events SET hours = ? WHERE id = ?`, ['00:00', e.id])
        })
      )
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('hours')
    })
  }
}
