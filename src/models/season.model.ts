import Joi from 'joi'
import { GET_DB } from '@/config/mongdodb'
import { Season } from '@/interfaces/season'
import { ObjectId } from 'mongodb'
import { episodeModel } from '@/models/episode.model'

const SEASON_COLLECTION_NAME = 'seasons'
const SEASON_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(30).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).trim().strict(),
  characters: Joi.array().items(Joi.string()).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),

  _destroy: Joi.boolean().default(false)
})


const validateBeforeCreateSeason = async (data: Season) => {
  return await SEASON_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNewSeason = async (data: Season) => {
  try {
    const validSeason = await validateBeforeCreateSeason(data)
    const createdSeason = await GET_DB().collection(SEASON_COLLECTION_NAME).insertOne(validSeason)
    return createdSeason
  } catch (e) {
    throw new Error(e)
  }
}

const findOneSeasonById = async (id: ObjectId | string) => {
  try {
    const result = await GET_DB().collection(SEASON_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (e) {
    throw new Error(e)
  }
}

const getSeasonDetails = async (id: ObjectId | string) => {
  try {
    // const result = await GET_DB().collection(SEASON_COLLECTION_NAME).findOne({
    //   _id: new ObjectId(id)
    // })
    const result = await GET_DB().collection(SEASON_COLLECTION_NAME).aggregate([
      {
        $match: {
          _id: new ObjectId(id),
          _destroy: false
        }
      },
      {
        $lookup: {
          from: episodeModel.EPISODE_COLLECTION_NAME,
          localField: '_id',
          foreignField: 'seasonId',
          as: 'episodes'
        }
      }
    ]).toArray()
    return result[0] || null

  } catch (e) {
    throw new Error(e)
  }
}


export const seasonModel = {
  SEASON_COLLECTION_NAME,
  SEASON_COLLECTION_SCHEMA,
  createNewSeason,
  findOneSeasonById,
  getSeasonDetails
}