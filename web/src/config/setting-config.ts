/**
 * Main Configuration that allow to settings the apps
 * inclduing the vars, config and all settings
 */
export const configuration = {
  api: {
    url: process.env.NEXT_PUBLIC_BACKEND_API_URL!,
  },
  auth: {
    github: {
      clientId: process.env.AUTH_GITHUB_CLIENT_ID!,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
    },
  },
}
