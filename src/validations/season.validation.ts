import { StatusCodes } from 'http-status-codes'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

const createSeason = async (req: Request, res: Response, next: NextFunction) => {
  const correctSeason = Joi.object({
    title: Joi.string().required().min(3).max(30).trim().strict(),
    description: Joi.string().required().min(3).trim().strict()
  })

  try {
    console.log('BODY', req.body)
    await correctSeason.validateAsync(req.body, {
      abortEarly: false
    })
    // next()
    res.status(StatusCodes.CREATED).json({ message: 'POST from validation: Api createSeason' })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: new Error(error).message })
  }
}

export const seasonValidation = {
  createSeason
}