import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

export const pool = new Pool({
  // Use POSTGRES_URL which we verified has the sslmode=require parameter
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30_000,
  ssl: {
    rejectUnauthorized: false
  }
})

export const db = drizzle(pool, { schema })