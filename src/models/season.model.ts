import Joi from 'joi'
import { GET_DB } from '@/config/mongdodb'
import { Season } from '@/interfaces/season'
import { ObjectId } from 'mongodb'

const SEASON_COLLECTION_NAME = 'seasons'
const SEASON_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(30).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).trim().strict(),
  type: Joi.string().required().min(3).trim().strict(),
  characters: Joi.array().items(Joi.string()).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),

  _destroy: Joi.boolean().default(false)
})

const createSeason = async (seasonData: Season) => {
  try {
    const createdSeason = await GET_DB().collection(SEASON_COLLECTION_NAME).insertOne(seasonData)
    return createdSeason
  } catch (e) {
    throw new Error(e)
  }
}

const findOneSeasonById = async (id: ObjectId) => {
  try {
    const result = await GET_DB().collection(SEASON_COLLECTION_NAME).findOne({
      _id: id
    })
    return result
  } catch (e) {
    throw new Error(e)
  }
}

export const seasonModel = {
  SEASON_COLLECTION_NAME,
  SEASON_COLLECTION_SCHEMA,
  createSeason,
  findOneSeasonById
}