import { StatusCodes } from 'http-status-codes'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import ApiError from '@/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/utils/validators'

const createNewSeason = async (req: Request, res: Response, next: NextFunction) => {
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

const updateSeason = async (req: Request, res: Response, next: NextFunction) => {
  const correctSeason = Joi.object({
    title: Joi.string().min(3).max(30).trim().strict(),
    description: Joi.string().min(3).trim().strict()
  })

  try {
    await correctSeason.validateAsync(req.body, {
      abortEarly: false,
      // đối với trường hợp update, cho phép Unknown để cho phep đẩy một số field không có trong correctSeason lên
      allowUnknown: true
    })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const deleteSeason = async (req: Request, res: Response, next: NextFunction) => {
  const correctSeason = Joi.object({
    id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })
  try {
    await correctSeason.validateAsync(req.params)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const seasonValidation = {
  createNewSeason,
  updateSeason,
  deleteSeason
}