import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import StoreValidator from 'App/Validators/Event/StoreValidator'
import UpdateValidator from 'App/Validators/Event/UpdateValidator'

export default class EventsController {
  public async index(ctx: HttpContextContract) {
    const events = await Event.query()
    return ctx.view.render('events/list', {
      events,
    })
  }

  public async create(ctx: HttpContextContract) {
    return ctx.view.render('events/create')
  }

  public async store(ctx: HttpContextContract) {
    const data = await ctx.request.validate(StoreValidator)
    await Event.create(data)
    return ctx.response.redirect('/events')
  }

  public async edit(ctx: HttpContextContract) {
    const event = await Event.find(ctx.params.id)
    if (!event) {
      return ctx.response.notFound('Event Not Found')
    }
    return ctx.view.render('events/edit', { event })
  }

  public async update(ctx: HttpContextContract) {
    const event = await Event.find(ctx.params.id)
    if (!event) {
      return ctx.response.notFound('Event Not Found')
    }
    const data = await ctx.request.validate(UpdateValidator)
    event.merge(data)
    await event.save()
    return ctx.response.redirect('/events')
  }

  public async show(ctx: HttpContextContract) {
    const event = await Event.find(ctx.params.id)
    if (!event) {
      return ctx.response.notFound('Event Not Found')
    }
    return ctx.view.render('events/index', { event })
  }

  public async destroy(ctx: HttpContextContract) {
    const event = await Event.find(ctx.params.id)
    if (!event) {
      return ctx.response.notFound('Event Not Found')
    }
    await event.delete()
    return ctx.response.redirect('/events')
  }
}
