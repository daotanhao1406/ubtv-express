import { WHITELIST_DOMAINS } from '@/utils/constants'
import { env } from '@/config/environment'
import { StatusCodes } from 'http-status-codes'
import ApiError from '@/utils/ApiError'

export const corsOptions = {
  origin: function(origin, callback) {
    // Cho phép việc gọi API bằng POSTMAN trên môi trường dev,
    // Thông thường khi sử dụng postman thì cái origin sẽ có giá trị là undefined

    // chỉnh sửa lại là không cần check !origin nữa, chỉ cần là dev thì tự động cho qua luôn.
    // Vì nếu check origin thì giống như POSTMAN, ở 1 số trường hợp ví dụ như Nextjs, nó sẽ cần phải gọi api từ phía server
    // thì khi đó origin (domain) cũng là undefined
    if (env.NODE_ENV === 'development') {
      return callback(null, true)
    }

    // ngược lại thì hiện tại code chúng ta sẽ nhảy vào trường hợp mode là production

    // Kiểm tra dem origin có phải là domain được chấp nhận hay không
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    // Cuối cùng nếu domain không được chấp nhận thì trả về lỗi
    return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`))
  },

  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // CORS sẽ cho phép nhận cookies từ request
  credentials: true
}