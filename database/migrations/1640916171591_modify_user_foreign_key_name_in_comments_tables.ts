import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Comments extends BaseSchema {
  protected tableName = 'comments'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('user_id', 'sender_id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('sender_id', 'user_id')
    })
  }
}
