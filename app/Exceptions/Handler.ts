import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import Logger from '@ioc:Adonis/Core/Logger'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  constructor() {
    super(Logger)
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
