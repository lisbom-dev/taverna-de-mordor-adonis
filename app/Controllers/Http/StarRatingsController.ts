import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import StarRating from 'App/Models/StarRating'
import UpdateValidator from 'App/Validators/StarRating/UpdateValidator'

export default class StarRatingsController {
  public async update({ params, response, bouncer, request }: HttpContextContract) {
    const starRating = await StarRating.find(params.id)

    if (!starRating) {
      return response.notFound('Star Rating not found!')
    }
    await bouncer.with('StarRatingPolicy').authorize('update', starRating)
    const data = await request.validate(UpdateValidator)
    starRating.merge(data)
    await starRating.save()
  }

  public async destroy({ params, bouncer, response }: HttpContextContract) {
    const starRating = await StarRating.find(params.id)
    if (!starRating) {
      return response.notFound('Star Rating not found!')
    }
    await bouncer.with('StarRatingPolicy').authorize('delete', starRating)
    await starRating.delete()
  }
}
