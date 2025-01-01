import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { seasonRoute } from '@/routes/v1/season.route'

const router = Router()

// check status for api v1
router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Hello api v1!' })
})

router.use('/seasons', seasonRoute)

export const APIs_V1 = router