import * as z from 'zod'

export const googleAuthInputSchema = z.object({
  accessToken: z.string().min(1, 'Please add the access token'),
  idToken: z.string().min(1, 'Please add the Id Token'),
})

export const githubAuthInputSchema = z.object({
  accessToken: z.string().min(1, 'Please add the access token'),
})

export type GoogleAuthInput = z.infer<typeof googleAuthInputSchema>
export type GithubAuthInput = z.infer<typeof githubAuthInputSchema>
