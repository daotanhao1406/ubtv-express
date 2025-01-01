import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const createSeason = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(StatusCodes.CREATED).json({ message: 'POST from controller: Api createSeason' })
  } catch (e) {
    next(e)
  }
}

export const seasonController = { createSeason }