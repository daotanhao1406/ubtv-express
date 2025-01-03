import { seasonService } from '@/services/season.service'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const createSeason = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await seasonService.createSeason(req.body)
    res.status(StatusCodes.CREATED).json(result)
  } catch (e) {
    next(e)
  }
}

const getSeasonDetailsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const seasonId = req.params.id
    const result = await seasonService.getSeasonDetails(seasonId)
    res.status(StatusCodes.OK).json(result)
  } catch (e) {
    next(e)
  }
}

export const seasonController = { createSeason, getSeasonDetailsById }