import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '@/config/environment'

let ubtvDatabaseInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()

  ubtvDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!ubtvDatabaseInstance) throw new Error('MongoDB connection returns undefined')
  return ubtvDatabaseInstance
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}