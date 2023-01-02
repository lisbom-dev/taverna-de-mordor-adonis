import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Board from 'App/Models/Board'

export default class BoardPlayersController {
  public async store({ params, response, bouncer }: HttpContextContract) {
    const board = await Board.find(params.board_id)

    if (!board) {
      return response.notFound('Board not found!')
    }
    if (board.players.length === board.maxPlayers) {
      throw new BadRequestException('All seats have already been filled!')
    }
    const pendingPlayer = board.pendingPlayers.find((p) => p.id === parseInt(params.player_id, 10))
    if (!pendingPlayer) {
      return response.notFound('User not found!')
    }
    await bouncer.with('BoardPlayerPolicy').authorize('create', board, pendingPlayer)

    await board.related('players').attach({
      [pendingPlayer.id]: {
        character_name: pendingPlayer.$extras.pivot_character_name,
        session_who_entered: board.currentSection,
      },
    })
    await board.related('pendingPlayers').detach([pendingPlayer.id])

    return response.ok({ message: 'ok' })
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
    return response.ok({ message: 'ok' })
  }
}
