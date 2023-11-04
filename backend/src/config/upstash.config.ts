import { Redis } from '@upstash/redis'
import { settingConfig } from './setting.config'

/** Redis configuration client */
export const upstashRedisClient = new Redis({
  url: settingConfig.upstash.redis.url,
  token: settingConfig.upstash.redis.token,
})
