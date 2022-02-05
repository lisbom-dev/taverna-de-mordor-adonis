import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
import System from 'App/Models/System'
import StoreValidator from 'App/Validators/Board/StoreValidator'
import UpdateValidator from 'App/Validators/Board/UpdateValidator'

export default class BoardsController {
  public async index({ request, view }: HttpContextContract) {
    const { page = '1' } = request.qs()
    const boards = await Board.query().paginate(parseInt(page, 10), 9)
    return view.render('boards/list', {
      boards,
      page,
    })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('BoardPolicy').authorize('create')
    const systems = await System.query()
    return view.render('boards/create', { systems })
  }

  public async store({ request, response, session }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    await Board.create(data)
    session.flash('success', ['Mesa criada com sucesso!'])
    return response.redirect('/boards')
  }

  public async show({ response, view, params, auth }: HttpContextContract) {
    const board = await Board.find(params.id)
    if (!board) {
      return response.notFound('Board not found')
    }
    if (auth.user) {
      const authReview = board.reviews.find((r) => r.sender.id === auth.user!.id)
      return view.render('boards/index', { board, authReview, auth })
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

  public async update({ params, response, request, session }: HttpContextContract) {
    const board = await Board.find(params.id)
    if (!board) {
      return response.notFound('Board not found')
    }
    const data = await request.validate(UpdateValidator)
    board.merge(data)
    await board.save()
    session.flash('success', ['Mesa atualizada com sucesso!'])
    return response.redirect('/boards')
  }

  public async destroy({ bouncer, params, response, session }: HttpContextContract) {
    const board = await Board.find(params.id)
    if (!board) {
      return response.notFound('Board not found')
    }
    await bouncer.with('BoardPolicy').authorize('invoke', board)
    await board.delete()
    session.flash('success', ['Mesa deletada com sucesso!'])
    return response.redirect('/boards')
  }
}
