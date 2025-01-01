import { slugify } from '@/utils/formatter'
import { Season } from '@/interfaces/season'

const createSeason = async (reqBody: Season) => {
  try {
    return { ...reqBody, slug: slugify(reqBody.title) }
  } catch (e) {
    throw e
  }
}

export const seasonService = {
  createSeason
}