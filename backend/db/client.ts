import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { settingConfig } from '~/config/setting.config'
import * as schema from './schema'

const client = postgres(settingConfig.database.neon.url)

/**
 * Database connection to main
 * database using libsql & drizzle
 */
const dbConnection = drizzle(client, { schema })

export { dbConnection }
