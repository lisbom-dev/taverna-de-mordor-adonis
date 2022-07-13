import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
import System from 'App/Models/System'
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

  public async create({ bouncer }: HttpContextContract) {
    await bouncer.with('BoardPolicy').authorize('create')
    const systems = await System.query()
    return systems
  }

  public async store({ request, response, session }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    await Board.create(data)
    session.flash('success', ['Mesa criada com sucesso!'])
    return response.ok('ok')
  }

  public async show({ response, params, auth }: HttpContextContract) {
    const board = await Board.find(params.id)
    if (!board) {
      return response.notFound('Board not found')
    }
    if (auth.user) {
      const authReview = board.reviews.find((r) => r.sender.id === auth.user!.id)
      return { board, authReview, auth }
    }
    return board
  }

  public async edit({ response, params, bouncer }: HttpContextContract) {
    const board = await Board.find(params.id)
    if (!board) {
      return response.notFound('Board not found')
    }
    await bouncer.with('BoardPolicy').authorize('invoke', board)
    return board
  }

  public async update({ params, response, request, session }: HttpContextContract) {
    const board = await Board.find(params.id)
    if (!board) {
      return response.notFound('Board not found')
    }
    const data = await request.validate(UpdateValidator)
    board.merge(data)
    await board.save()
    session.flash('success', ['Mesa atualizada com sucesso!'])
    return response.ok('ok')
  }

  public async destroy({ bouncer, params, response, session }: HttpContextContract) {
    const board = await Board.find(params.id)
    if (!board) {
      return response.notFound('Board not found')
    }
    await bouncer.with('BoardPolicy').authorize('invoke', board)
    await board.delete()
    session.flash('success', ['Mesa deletada com sucesso!'])
    return response.ok('ok')
  }
}
