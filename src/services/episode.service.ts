import { episodeModel } from '@/models/episode.model'
import { Episode } from '@/interfaces/episode'

const createNewEpisode = async (reqBody: Episode) => {
  try {
    const newEpisode = { ...reqBody }

    const createdEpisode = await episodeModel.createNewEpisode(newEpisode)

    const getCreatedEpisode = await episodeModel.findOneEpisodeById(createdEpisode.insertedId)

    return getCreatedEpisode
  } catch (e) {
    throw e
  }
}


export const episodeService = {
  createNewEpisode
}