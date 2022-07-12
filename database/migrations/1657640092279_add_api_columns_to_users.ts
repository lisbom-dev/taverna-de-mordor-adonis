import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddApiColumnsToUsers extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('provider', 50).notNullable().defaultTo('local')
      table.string('provider_id', 180).nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('provider')
      table.dropColumn('providerId')
    })
  }
}
