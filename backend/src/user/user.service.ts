import {
  AuthJwtUser,
  GithubOAuthData,
  GoogleOAuthData,
} from '~/auth/model/auth.payload'
import {
  CreateUserInput,
  VerifyActivationAccountInput,
} from './model/user.input'
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from '~/utils/http-exception'
import { generateRandomCharsAndNumbers } from '~/utils/helpers'
import { emailService } from '~/email/email.service'
import { User, UserPayload } from './model/user.payload'
import { dbConnection } from '@db/client'
import { eq } from 'drizzle-orm'
import { users } from '@db/schema'
import { upstashRedisClient } from '~/config/upstash.config'

class UserService {
  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await dbConnection.query.users.findFirst({
        where: eq(users.email, email),
      })

      return user
    } catch (error) {
      throw new BadRequestException()
    }
  }

  generateUsernameFromEmail(email: string): string {
    return email.split('@')[0]
  }

  async createNewUser(input: CreateUserInput): Promise<User> {
    const newUser = (
      await dbConnection.insert(users).values(input).returning()
    )[0]
    return newUser
  }

  async assignProvider(user: User, provider: string): Promise<void> {
    if (!user.providers!.includes(provider)) {
      try {
        const newProviders = [...user.providers!.split(','), provider]
        const stringProviders = newProviders.join(',')
        await dbConnection
          .update(users)
          .set({ providers: stringProviders })
          .where(eq(users.id, user.id))
      } catch {
        throw new UnprocessableEntityException('auth/failed-update-provider')
      }
    }
  }

  async signGoogleUser(input: GoogleOAuthData): Promise<UserPayload> {
    const GOOGLE_PROVIDER = 'google'

    let user = await this.getUserByEmail(input.email)
    if (!user) {
      const newUser: CreateUserInput = {
        avatar: input.picture,
        email: input.email,
        active: false,
        fullName: input.name,
        role: 'user',
        providers: GOOGLE_PROVIDER,
        username: this.generateUsernameFromEmail(input.email),
      }

      user = await this.createNewUser(newUser)
    }

    await this.assignProvider(user, GOOGLE_PROVIDER)
    return user
  }

  async signGithubUser(input: GithubOAuthData): Promise<UserPayload> {
    const GITHUB_PROVIDER = 'github'

    let user = await this.getUserByEmail(input.email)
    if (!user) {
      const newUser: CreateUserInput = {
        avatar: input.avatar_url,
        email: input.email,
        active: false,
        fullName: input.name,
        role: 'user',
        providers: GITHUB_PROVIDER,
        username: this.generateUsernameFromEmail(input.email),
      }

      user = await this.createNewUser(newUser)
    }

    await this.assignProvider(user, GITHUB_PROVIDER)
    return user
  }

  async sendAccountActivationEmail(input: AuthJwtUser): Promise<void> {
    const user = await this.getUserByEmail(input.email)
    if (user) {
      const verificationCode = generateRandomCharsAndNumbers(6)
      await upstashRedisClient.set(`${user.id}-token`, verificationCode)
      await emailService.sendVerificationEmail(user, verificationCode)
      return
    } else {
      throw new NotFoundException('user/not-found')
    }
  }

  async resendAccountActivationEmail(input: AuthJwtUser): Promise<void> {
    return this.sendAccountActivationEmail(input)
  }

  async activateAccount(userId: string): Promise<void> {
    try {
      await dbConnection
        .update(users)
        .set({ active: true })
        .where(eq(users.id, userId))
      return
    } catch (error) {
      throw new UnprocessableEntityException('user/activation-failed')
    }
  }

  async verifyActivationAccount(
    input: VerifyActivationAccountInput,
    authUser: AuthJwtUser,
  ): Promise<void> {
    const user = await this.getUserByEmail(authUser.email)
    if (!user) {
      throw new NotFoundException('user/not-found')
    }

    const token = await upstashRedisClient.get<string>(`${user.id}-token`)
    if (!token) {
      throw new ForbiddenException('token-expired')
    }

    if (input.token !== token) {
      throw new ConflictException('user-token-invalid')
    }

    await this.activateAccount(user.id)
    await upstashRedisClient.del(`${user.id}-token`)
    return emailService.sendOnboardingEmail(user)
  }

  async getUserFromCredential(userId: string): Promise<UserPayload> {
    try {
      const user = (
        await dbConnection.select().from(users).where(eq(users.id, userId))
      )[0]
      return user
    } catch (error) {
      throw new NotFoundException('user/not-found')
    }
  }
}

export const userService = new UserService()
