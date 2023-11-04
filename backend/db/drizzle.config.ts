import { type Config } from 'drizzle-kit'
import { settingConfig } from '~/config/setting.config'

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: settingConfig.database.neon.url,
  },
} satisfies Config
