import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
import StoreValidator from 'App/Validators/Board/StoreValidator'
import UpdateValidator from 'App/Validators/Board/UpdateValidator'

export default class BoardsController {
  public async index({ view }: HttpContextContract) {
    const boards = await Board.query()
    return view.render('boards/list', {
      boards,
    })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('BoardPolicy').authorize('create')
    return view.render('boards/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    await Board.create(data)
    return response.redirect('/boards')
  }

  public async show({ response, view, params }: HttpContextContract) {
    const board = await Board.find(params.id)
    if (!board) {
      return response.notFound('Board not found')
    }
    return view.render('boards/index', { board })
  }

  public async edit({ response, view, params, bouncer }: HttpContextContract) {
    const board = await Board.find(params.id)
    if (!board) {
      return response.notFound('Board not found')
    }
    await bouncer.with('BoardPolicy').authorize('invoke', board)
    return view.render('boards/edit', { board })
  }

  public async update({ params, response, request }: HttpContextContract) {
    const board = await Board.find(params.id)
    if (!board) {
      return response.notFound('Board not found')
    }
    const data = await request.validate(UpdateValidator)
    board.merge(data)
    await board.save()
    return response.redirect('/boards')
  }

  public async destroy({ bouncer, params, response }: HttpContextContract) {
    const board = await Board.find(params.id)
    if (!board) {
      return response.notFound('Board not found')
    }
    await bouncer.with('BoardPolicy').authorize('invoke', board)
    await board.delete()
    return response.redirect('/boards')
  }
}
