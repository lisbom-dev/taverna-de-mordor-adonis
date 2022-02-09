import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Events extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropNullable('hours')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.setNullable('hours')
    })
  }
}
