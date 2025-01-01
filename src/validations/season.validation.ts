import { StatusCodes } from 'http-status-codes'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import ApiError from '@/utils/ApiError'

const createSeason = async (req: Request, res: Response, next: NextFunction) => {
  const correctSeason = Joi.object({
    title: Joi.string().required().min(3).max(30).trim().strict(),
    description: Joi.string().required().min(3).trim().strict()
  })

  try {
    await correctSeason.validateAsync(req.body, {
      abortEarly: false
    })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const seasonValidation = {
  createSeason
}