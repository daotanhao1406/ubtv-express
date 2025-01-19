import { slugify } from '@/utils/formatter'
import { Season } from '@/interfaces/season'
import { seasonModel } from '@/models/season.model'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNewSeason = async (reqBody: Season) => {
  try {
    const newSeason = { ...reqBody, slug: slugify(reqBody.title) }

    const createdSeason = await seasonModel.createNewSeason(newSeason)

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
const updateSeason = async (id: string, reqBody) => {
  try {


    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedSeason = await seasonModel.updateSeason(id, updateData)
    if (!updatedSeason) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Season not found')
    }
    return updatedSeason
  } catch (e) {
    throw e
  }
}
const deleteSeason = async (id: string) => {
  try {
    const targetSeason = await seasonModel.findOneSeasonById(id)
    if (!targetSeason) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Season not found')
    }
    await seasonModel.deleteOneById(id)

    return { message: 'Delete season successfully!' }
  } catch (e) {
    throw e
  }
}

export const seasonService = {
  createNewSeason,
  getSeasonDetails,
  updateSeason,
  deleteSeason
}