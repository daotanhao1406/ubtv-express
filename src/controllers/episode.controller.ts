import { episodeService } from '@/services/episode.service'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const createNewEpisode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await episodeService.createNewEpisode(req.body)
    res.status(StatusCodes.CREATED).json(result)
  } catch (e) {
    next(e)
  }
}

export const episodeController = { createNewEpisode }