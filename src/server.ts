import express, { Express, Request, Response, Application, NextFunction } from 'express'
import { CLOSE_DB, CONNECT_DB } from '@/config/mongdodb'
import exitHook from 'async-exit-hook'
import cors from 'cors'
import { env } from '@/config/environment'
import { APIs_V1 } from '@/routes/v1'
import { errorMiddleware } from '@/middlewares/error.middleware'
import { corsOptions } from '@/config/cors'

const START_SERVER = () => {

  const app: Application = express()

  // cors
  app.use(cors(corsOptions))

  // parse json request body
  app.use(express.json())

  // v1 api routes
  app.use('/v1', APIs_V1)

  // Middlewares handle error
  app.use(errorMiddleware)

  if (env.NODE_ENV === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`3. Production: Server is Fire at ${process.env.PORT}`)
    })
  } else {
    app.listen(env.LOCAL_DEV_APP_PORT, () => {
      console.log(`3. Dev: Server is Fire at http://localhost:${env.LOCAL_DEV_APP_PORT}`)
    })
  }


  exitHook(() => {
    console.log('4. Disconnecting from MongoDB...')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB')
  })
}

// IIFE (Immediately Invoked Function Expression)
(async () => {
  try {
    console.log('1. Connecting to MongoDB...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB')

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()