import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/utils/validators'

const EPISODE_COLLECTION_NAME = 'episodes'
const EPISODE_COLLECTION_SCHEMA = Joi.object({
  seasonId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  orderNumber: Joi.number().required().min(0),

  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),

  _destroy: Joi.boolean().default(false)
})

export const seasonModel = {
  EPISODE_COLLECTION_NAME,
  EPISODE_COLLECTION_SCHEMA
}