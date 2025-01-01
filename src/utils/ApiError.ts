export default class ApiError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(
    statusCode: number,
    message: string
  ) {
    super(message)

    this.name = 'ApiError'
    this.statusCode = statusCode

    Error.captureStackTrace(this, this.constructor)
  }
}
