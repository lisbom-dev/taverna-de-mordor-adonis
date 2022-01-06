import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Systems extends BaseSchema {
  protected tableName = 'systems'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.setNullable('photo_url')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropNullable('photo_url')
    })
  }
}
