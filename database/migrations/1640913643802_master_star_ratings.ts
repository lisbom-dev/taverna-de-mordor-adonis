import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MasterStarRatings extends BaseSchema {
  protected tableName = 'master_star_ratings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('master_id').notNullable().references('id').inTable('users')
      table.integer('star_rating_id').notNullable().references('id').inTable('star_ratings')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
