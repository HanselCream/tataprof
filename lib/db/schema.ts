import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt', { withTimezone: true, mode: 'date' }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt', { withTimezone: true, mode: 'date' }),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', { withTimezone: true, mode: 'date' }),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt', { withTimezone: true, mode: 'date' }).notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true, mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true, mode: 'date' }).defaultNow(),
})

export const profiles = pgTable('profiles', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  slug: text('slug').notNull().unique(),
  displayName: text('displayName').notNull(),
  title: text('title').notNull().default(''),
  bio: text('bio').notNull().default(''),
  email: text('email').notNull().default(''),
  phone: text('phone').notNull().default(''),
  whatsapp: text('whatsapp').notNull().default(''),
  website: text('website').notNull().default(''),
  instagram: text('instagram').notNull().default(''),
  facebook: text('facebook').notNull().default(''),
  tiktok: text('tiktok').notNull().default(''),
  createdAt: timestamp('createdAt', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
})

export type Profile = typeof profiles.$inferSelect
export type NewProfile = typeof profiles.$inferInsert
