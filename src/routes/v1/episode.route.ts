import { Router } from 'express'
import { episodeValidation } from '@/validations/episode.validation'
import { episodeController } from '@/controllers/episode.controller'


const router = Router()

router.route('/').post(episodeValidation.createNewEpisode, episodeController.createNewEpisode)

export const episodeRoute = router