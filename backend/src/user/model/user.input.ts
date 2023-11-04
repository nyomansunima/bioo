import { users } from '@db/schema'

export type CreateUserInput = typeof users.$inferInsert

export type VerifyActivationAccountInput = {
  token: string
}
