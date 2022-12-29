import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UpdateUsernameValuesIfIsNulls extends BaseSchema {
  public async up() {
    this.defer(async (db) => {
      const users = await db.from('users')

      await Promise.all(
        users.map(async (u) => {
          if (!u.username) {
            await db.knexRawQuery('UPDATE users SET username = name WHERE id = ?', [u.id])
          }
        })
      )
    })
  }
}
