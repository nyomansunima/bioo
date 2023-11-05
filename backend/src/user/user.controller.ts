import { Router } from 'express'
import { jwtAuthGuard } from '~/auth/jwt-auth.guard'
import { routeHandler } from '~/utils/handler'
import { getAuthUser } from '~/utils/helpers'
import { userService } from './user.service'

const userController = Router()

userController.get(
  '/user',
  jwtAuthGuard,
  routeHandler(async (req) => {
    const user = getAuthUser(req)
    const res = await userService.getUserByEmail(user.email)
    return res
  }),
)

export default userController
