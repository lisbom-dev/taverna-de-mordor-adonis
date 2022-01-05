import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Boards extends BaseSchema {
  protected tableName = 'boards'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      //transformar o system id da tabela em uma coisa nao nula
      table.dropNullable('system_id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.setNullable('system_id')
    })
  }
}
