export const WHITELIST_DOMAINS = [
  // 'http://localhost:3000', // bỏ localhost đi vì không thể để local có thể gọi được tài nguyên trên server production
  // không cần localhost tại whitelist nữa vì ở file cors đã luôn cho phép môi trường dev
  'https://ubtv-staging.vercel.app',
  'https://ubtv-production.vercel.app'
]