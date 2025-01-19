import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { seasonValidation } from '@/validations/season.validation'
import { seasonController } from '@/controllers/season.controller'

const router = Router()

router.route('/').get((req, res) => {
  res.status(StatusCodes.OK).json({ message: 'GET: Api get season' })
}).post(seasonValidation.createNewSeason, seasonController.createNewSeason)

router.route('/:id')
  .get(seasonController.getSeasonDetailsById)
  .put(seasonValidation.updateSeason, seasonController.updateSeason)
  .delete(seasonValidation.deleteSeason, seasonController.deleteSeason)

export const seasonRoute = router