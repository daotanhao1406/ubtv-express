import Joi from 'joi'

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

export const seasonModel = {
  SEASON_COLLECTION_NAME,
  SEASON_COLLECTION_SCHEMA
}