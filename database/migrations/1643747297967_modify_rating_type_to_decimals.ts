import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reviews extends BaseSchema {
  protected tableName = 'reviews'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('rating').alter().notNullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('rating').alter().notNullable()
    })
  }
}
