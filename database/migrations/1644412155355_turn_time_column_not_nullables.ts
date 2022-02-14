import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Events extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropNullable('time')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.setNullable('time')
    })
  }
}
