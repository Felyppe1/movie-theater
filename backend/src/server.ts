import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../swagger.json'
import 'express-async-errors'
import { env } from './env'
import { router } from './http/routes'
import { AppError } from './errors/AppError'
import cors from 'cors'
import { ZodError } from 'zod'

const app = express()

app.use(express.json())

app.use(cors({
  origin: `${env.FRONTEND_URL}`
}))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: 'Validation error', 
      issues: error.format()
    })
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message
    })
  }

  if (env.NODE_ENV != 'production') {
    console.error(error)
  } else {
    // Todo: log to an external tool like Datalog/NewRelic/Sentry
  }

  return response.status(500).json({
    message: `Internal server error: ${error.message}`
  })
})

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
})
