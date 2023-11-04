import { Router } from 'express'
import { validateBody } from '~/utils/validation'
import {
  githubAuthInputSchema,
  googleAuthInputSchema,
} from './model/auth.input'
import { getBody } from '~/utils/helpers'
import { authService } from './auth.service'
import { routeHandler } from '~/utils/handler'

const authController = Router()

authController.post(
  '/auth/google',
  validateBody(googleAuthInputSchema),
  routeHandler(async (req) => {
    const body = await getBody(req)
    return await authService.googleAuth(body)
  }),
)

authController.post(
  '/auth/github',
  validateBody(githubAuthInputSchema),
  routeHandler(async (req) => {
    const body = await getBody(req)
    return await authService.githubAuth(body)
  }),
)

export default authController
