import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Review from 'App/Models/Review'
import UpdateValidator from 'App/Validators/Review/UpdateValidator'

export default class ReviewsController {
  public async update({ request, bouncer, params, response }: HttpContextContract) {
    const review = await Review.find(params.id)
    if (!review) {
      return response.notFound('Review not found')
    }
    await bouncer.with('ReviewPolicy').authorize('update', review)
    const data = await request.validate(UpdateValidator)
    review.merge(data)
    await review.save()
    return response.redirect().back()
  }

  public async destroy({ bouncer, params, response }: HttpContextContract) {
    const review = await Review.find(params.id)
    if (!review) {
      return response.notFound('review not found')
    }
    await bouncer.with('ReviewPolicy').authorize('delete', review)
    await review.delete()
    return response.redirect().back()
  }
}
