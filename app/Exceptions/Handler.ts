import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    if (error.status === 403) {
      ctx.session.flash('error', ['Não autorizado!'])
      return ctx.response.redirect().back()
    }
    if (error.status === 401) {
      return ctx.response.redirect('/login')
    }
    if (error.status === 422) {
      const sanitized = this.sanitizeErrors(error.messages)
      ctx.session.flash('error', sanitized)
      return ctx.response.redirect().back()
    }
    if (error.status === 400) {
      ctx.session.flash('error', [error.message])
      return ctx.response.redirect().back()
    }
  }

  private sanitizeErrors(errorObject: any) {
    const keys = Object.keys(errorObject)
    const messages: string[] = []
    keys.forEach((key) => {
      if (typeof errorObject[key] === 'string') {
        if (messages.indexOf(errorObject[key]) === -1) {
          messages.push(errorObject[key])
        }
      } else {
        messages.push(...this.sanitizeErrors(errorObject[key]))
      }
    })
    return messages
  }
}
