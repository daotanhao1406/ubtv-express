import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { seasonValidation } from '@/validations/season.validation'
import { seasonController } from '@/controllers/season.controller'

const router = Router()

router.route('/').get((req, res) => {
  res.status(StatusCodes.OK).json({ message: 'GET: Api get season' })
}).post(seasonValidation.createSeason, seasonController.createSeason)

router.route('/:id').get(seasonController.getSeasonDetailsById)

export const seasonRoute = router