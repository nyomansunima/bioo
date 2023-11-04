import { Resend } from 'resend'
import { settingConfig } from './setting.config'

/**
 * Resend client to allow
 * access the api and all service in resend
 * including to send, and configuration
 */
export const resendClient = new Resend(settingConfig.resend.apiKey)
