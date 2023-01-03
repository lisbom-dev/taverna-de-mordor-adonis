import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
import StoreValidator from 'App/Validators/BoardPlayer/StoreValidator'

export default class PendingPlayersController {
  public async store({ request, response, params, bouncer, auth, session }: HttpContextContract) {
    const board = await Board.find(params.board_id)
    if (!board) {
      return response.notFound('Board not found!')
    }
    await board.load('pendingPlayers')
    await bouncer.with('PendingPlayerPolicy').authorize('create', board)
    const data = await request.validate(StoreValidator)
    session.flash('success', ['Solicitação enviada com sucesso!'])
    await board.related('pendingPlayers').attach({
      [auth.user!.id]: {
        character_name: data.characterName,
      },
    })
    return response.redirect(`/boards/${board.id}`)
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    const board = await Board.find(params.board_id)
    if (!board) {
      return response.notFound('Board not found!')
    }
    const user = board.pendingPlayers.find((p) => p.id === parseInt(params.player_id))
    if (!user) {
      return response.notFound('Pending player not found!')
    }
    await bouncer.with('PendingPlayerPolicy').authorize('delete', board)
    board.related('pendingPlayers').detach([user.id])
    return response.redirect(`/boards/${board.id}`)
  }
}
