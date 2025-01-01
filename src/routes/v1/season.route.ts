import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { seasonValidation } from '@/validations/season.validation'

const router = Router()

router.route('/').get((req, res) => {
  res.status(StatusCodes.OK).json({ message: 'GET: Api get season' })
}).post(seasonValidation.createSeason)

export const seasonRoute = router