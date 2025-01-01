import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

const router = Router()

router.route('/').get((req, res) => {
  res.status(StatusCodes.OK).json({ message: 'GET: Api get season' })
}).post((req, res) => {
  res.status(StatusCodes.CREATED).json({ message: 'POST: Api create new season' })
})

export const seasonRoute = router