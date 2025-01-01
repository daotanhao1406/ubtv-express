import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const createSeason = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('BODY', req)

    res.status(StatusCodes.CREATED).json({ message: 'POST from controller: Api createSeason' })

  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message })
  }
}

export const seasonController = { createSeason }