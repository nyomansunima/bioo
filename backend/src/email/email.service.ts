import * as React from 'react'
import { OnboardingEmailTemplate } from '@templates/email/onboarding-email-template'
import { VerifyEmailTemplate } from '@templates/email/verification-email-template'
import { resendClient } from '~/config/resend.config'
import { User } from '~/user/model/user.payload'
import { InternalServerErrorException } from '~/utils/http-exception'

class EmailService {
  async sendVerificationEmail(
    user: User,
    verificationCode: string,
  ): Promise<void> {
    try {
      await resendClient.emails.send({
        from: 'verify@sonibble.com',
        to: [user.email!],
        subject: 'Activate Cooble Account',
        react: React.createElement(VerifyEmailTemplate, {
          fullName: user.fullName!,
          verificationCode: verificationCode,
        }),
      })
      return
    } catch (error) {
      throw new InternalServerErrorException('email/failed-sending-email')
    }
  }

  async sendOnboardingEmail(user: User): Promise<void> {
    try {
      await resendClient.emails.send({
        from: 'onboarding@sonibble.com',
        to: [user.email!],
        subject: 'Explore & setup workspace',
        react: React.createElement(OnboardingEmailTemplate, {
          fullName: user.fullName!,
        }),
      })
      return
    } catch (error) {
      throw new InternalServerErrorException('email/failed-sending-email')
    }
  }
}
export const emailService = new EmailService()
