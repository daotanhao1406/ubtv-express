import Joi from 'joi'
import { GET_DB } from '@/config/mongdodb'
import { Episode } from '@/interfaces/episode'
import { ObjectId } from 'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/utils/validators'

const EPISODE_COLLECTION_NAME = 'episodes'
const EPISODE_COLLECTION_SCHEMA = Joi.object({
  seasonId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  orderNumber: Joi.number().required().min(1),

  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),

  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreateEpisode = async (data: Episode) => {
  return await EPISODE_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNewEpisode = async (data: Episode) => {
  try {
    const validEpisode = await validateBeforeCreateEpisode(data)
    // convert season id to object id type 
    const newEpisode = {
      ...validEpisode,
      seasonId: new ObjectId(validEpisode.seasonId)
    }
    const createdEpisode = await GET_DB().collection(EPISODE_COLLECTION_NAME).insertOne(newEpisode)
    return createdEpisode
  } catch (e) {
    throw new Error(e)
  }
}

const findOneEpisodeById = async (id: ObjectId | string) => {
  try {
    const result = await GET_DB().collection(EPISODE_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (e) {
    throw new Error(e)
  }
}


export const episodeModel = {
  EPISODE_COLLECTION_NAME,
  EPISODE_COLLECTION_SCHEMA,
  createNewEpisode,
  findOneEpisodeById
}