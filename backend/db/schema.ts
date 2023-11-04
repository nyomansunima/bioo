import {
  boolean,
  char,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const userRoleEnum = pgEnum('user_role', ['user', 'admin'])

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  username: varchar('username'),
  fullName: char('full_name'),
  avatar: text('avatar'),
  email: varchar('email').unique(),
  bio: text('bio'),
  role: userRoleEnum('role'),
  providers: varchar('providers'),
  active: boolean('active'),
})