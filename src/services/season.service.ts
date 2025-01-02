import { slugify } from '@/utils/formatter'
import { Season } from '@/interfaces/season'
import { seasonModel } from '@/models/season.model'

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

export const seasonService = {
  createSeason
}