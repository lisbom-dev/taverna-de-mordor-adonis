import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
import StoreValidator from 'App/Validators/Board/StoreValidator'
import UpdateValidator from 'App/Validators/Board/UpdateValidator'

export default class BoardsController {
  public async index({ request }: HttpContextContract) {
    const { page = '1' } = request.qs()
    const boards = await Board.query().paginate(parseInt(page, 10), 9)
    return {
      boards,
      page,
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    await Board.create(data)
    return response.ok('ok')
  }

  public async show({ response, params, auth }: HttpContextContract) {
    const board = await Board.find(params.id)
    if (!board) {
      return response.notFound({ message: 'Board not found' })
    }
    if (auth.user) {
      const authReview = board.reviews.find((r) => r.sender.id === auth.user!.id)
      return { board, authReview, auth }
    }
    return board
  }

  public async update({ params, response, request }: HttpContextContract) {
    const board = await Board.find(params.id)
    if (!board) {
      return response.notFound({ message: 'Board not found' })
    }
    const data = await request.validate(UpdateValidator)
    board.merge(data)
    await board.save()
    return response.ok('ok')
  }

  public async destroy({ bouncer, params, response }: HttpContextContract) {
    const board = await Board.find(params.id)
    if (!board) {
      return response.notFound({ message: 'Board not found' })
    }
    await bouncer.with('BoardPolicy').authorize('invoke', board)
    await board.delete()
    return response.ok('ok')
  }
}
