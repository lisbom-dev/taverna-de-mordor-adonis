import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Board from 'App/Models/Board'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/BoardPlayer/StoreValidator'

export default class BoardPlayersController {
  public async store({ params, response, request, bouncer, session }: HttpContextContract) {
    const board = await Board.find(params.board_id)

    if (!board) {
      return response.notFound('Board not found!')
    }
    if (board.players.length === board.maxPlayers) {
      throw new BadRequestException('All seats have already been filled!')
    }
    const user = await User.find(params.player_id)
    if (!user) {
      return response.notFound('User not found!')
    }
    await bouncer.with('BoardPlayerPolicy').authorize('create', board, user)
    const data = await request.validate(StoreValidator)
    session.flash('success', [`${data.characterName} cadastrado a mesa com sucesso!`])

    await board.related('players').attach({
      [user.id]: {
        character_name: data.characterName,
        session_who_entered: board.currentSection,
      },
    })
    await board.related('pendingPlayers').detach([user.id])

    return response.redirect('/boards')
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    const board = await Board.find(params.board_id)
    if (!board) {
      return response.notFound('Board not found!')
    }
    const player = board.players.find((p) => p.id === parseInt(params.player_id))
    if (!player) {
      return response.notFound('Player not found!')
    }
    await bouncer.with('BoardPlayerPolicy').authorize('delete', board, player)
    await board.related('players').detach([player.id])
    return response.redirect(`/boards/${board.id}`)
  }
}
