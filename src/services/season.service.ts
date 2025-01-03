import { slugify } from '@/utils/formatter'
import { Season } from '@/interfaces/season'
import { seasonModel } from '@/models/season.model'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createSeason = async (reqBody: Season) => {
  try {
    const newSeason = { ...reqBody, slug: slugify(reqBody.title) }

    const createdSeason = await seasonModel.createSeason(newSeason)

    const getCreatedSeason = await seasonModel.findOneSeasonById(createdSeason.insertedId)

    return getCreatedSeason
  } catch (e) {
    throw e
  }
}

const getSeasonDetails = async (id: string) => {
  try {
    const season = await seasonModel.getSeasonDetails(id)
    if (!season) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Season not found')
    }
    return season
  } catch (e) {
    throw e
  }
}

export const seasonService = {
  createSeason,
  getSeasonDetails
}