import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BoardPlayers extends BaseSchema {
  protected tableName = 'board_players'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('session_who_entered').notNullable()
      table.string('character_name').notNullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('session_who_entered')
      table.dropColumn('character_name')
    })
  }
}
