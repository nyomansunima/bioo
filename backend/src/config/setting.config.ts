/** Settings configuration inclduding the env and vars */
export const settingConfig = {
  auth: {
    jwt: {
      secret: process.env.AUTH_JWT_SECRET!,
      accessExp: process.env.AUTH_ACCESS_EXP!,
      refreshExp: process.env.AUTH_REFRESH_EXP!,
    },
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY!,
  },
  upstash: {
    redis: {
      url: process.env.UPSTASH_REDIS_URL!,
      token: process.env.UPSTASH_REDIS_TOKEN!,
    },
  },
  database: {
    neon: {
      url: process.env.NEON_DATABASE_URL!,
    },
  },
}
