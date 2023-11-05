import { apiConnection } from '~/config/api-config'
import { UserProfile } from '~/types'

class UserService {
  async checkUserActivation(): Promise<boolean> {
    const res = await apiConnection<UserProfile>('/user', { auth: true })
    if (res?.activate) {
      return true
    }

    return false
  }
}

export const userService = new UserService()
