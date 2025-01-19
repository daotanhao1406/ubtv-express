import { StatusCodes } from 'http-status-codes'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import ApiError from '@/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/utils/validators'

const createNewEpisode = async (req: Request, res: Response, next: NextFunction) => {
  const correctEpisode = Joi.object({
    seasonId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    orderNumber: Joi.number().required().min(1)
  })

  try {
    await correctEpisode.validateAsync(req.body, {
      abortEarly: false
    })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const episodeValidation = {
  createNewEpisode
}