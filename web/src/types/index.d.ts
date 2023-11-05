export * from './next-auth'

export type UserProfile = {
  id: string
  email: string
  username: string
  providers?: string
  avatar?: string
  fullName?: string
  activate: boolean
  role: string
  bio?: string
}
