import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sessions extends BaseSchema {
  protected tableName = 'sessions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('event_board_id')
        .notNullable()
        .references('id')
        .inTable('event_boards')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.integer('time').notNullable()
      table.dateTime('date').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      const times = await db
        .from('times')
        .innerJoin('event_boards', 'event_boards.id', 'times.event_board_id')
        .innerJoin('events', 'events.id', 'event_boards.event_id')

      await Promise.all(
        times.map(async (t) => {
          await db.table('sessions').insert({
            event_board_id: t.event_board_id,
            time: t.start_hour,
            date: t.date,
            end_hour: t.end_hour,
            created_at: new Date(),
            updated_at: new Date(),
          })
        })
      )
    })

    this.schema.dropTable('times')
  }

  public async down() {
    this.schema.createTable('times', (table) => {
      table.increments('id')
      table
        .integer('event_board_id')
        .notNullable()
        .references('id')
        .inTable('event_boards')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.integer('start_hour').notNullable()
      table.integer('end_hour').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      const sessions = await db
        .from('sessions')
        .innerJoin('event_boards', 'event_boards.id', 'sessions.event_board_id')
        .innerJoin('events', 'events.id', 'event_boards.event_id')

      await Promise.all(
        sessions.map(async (s) => {
          await db.table('times').insert({
            event_board_id: s.event_board_id,
            start_hour: s.time,
            end_hour: s.time + 1000,
            created_at: new Date(),
            updated_at: new Date(),
          })
        })
      )
    })

    this.schema.dropTable(this.tableName)
  }
}
