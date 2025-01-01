/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { env } from '@/config/environment'

// Middleware xử lý lỗi tập trung trong ứng dụng Back-end NodeJS (ExpressJS)
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Nếu dev không cẩn thận thiếu statusCode thì mặc định sẽ để code 500 INTERNAL_SERVER_ERROR
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  // Tạo ra một biến responseError để kiểm soát những gì muốn trả về
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || getReasonPhrase(err.statusCode), // Nếu lỗi mà không có message thì lấy ReasonPhrases chuẩn theo mã Status Code
    stack: err.stack
  }
  console.log(err)
  // Chỉ khi môi trường là DEV thì mới trả về Stack Trace để debug dễ dàng hơn, còn không thì xóa đi.
  // if (env.NODE_ENV !== 'development') delete responseError.stack

  // Đoạn này có thể mở rộng nhiều về sau như ghi Error Log vào file, bắn thông báo lỗi vào group Slack, Telegram, Email...vv
  // ...

  // Trả responseError về phía Front-end
  res.status(responseError.statusCode).json(responseError)
}
