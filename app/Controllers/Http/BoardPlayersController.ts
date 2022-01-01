import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Board from 'App/Models/Board'
import StoreValidator from 'App/Validators/BoardPlayer/StoreValidator'

export default class BoardPlayersController {
  public async store({ params, response, request, auth }: HttpContextContract) {
    const board = await Board.find(params.board_id)

    if (!board) {
      return response.notFound('Board not found!')
    }
    if (board.playersAtTheBoard === board.maxPlayers) {
      throw new BadRequestException('All seats have already been filled!')
    }

    const data = await request.validate(StoreValidator)

    await board
      .related('players')
      .attach({ [auth.user!.id]: { character_name: data.characterName } })

    return response.redirect('/boards')
  }
}
