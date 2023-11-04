import { configuration } from './setting-config'

interface APIConenctionOption extends RequestInit {
  body?: any
  auth?: boolean
}

// retrive the token in every single request needed
// this will useful when the resource need the
// credential to access resources
const getSession = async (): Promise<string> => {
  try {
    const res = await fetch('/api/auth/session')

    if (res.ok) {
      const data = await res.json()
      return data.token
    } else {
      throw await res.json()
    }
  } catch (error) {
    throw error
  }
}

/**
 * ## useApiConnection
 *
 * Helper to help connec with the core backend api
 * with authentication feature included both in client and server
 *
 */
export async function apiConnection<T extends any>(
  url: RequestInfo | URL,
  options?: APIConenctionOption,
): Promise<T | null> {
  const baseUrl = configuration.api.url
  let defaultOption: APIConenctionOption = {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json, text/plain, */*,image/webp',
    },
  }
  if (options?.auth) {
    const accessToken = getSession()
    defaultOption = {
      ...defaultOption,
      headers: {
        ...defaultOption.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  }

  // encode the access url
  // by combine the base and the user access
  const accessUrl = `${baseUrl}${
    url.toString().startsWith('/') ? url : '/' + url
  }`

  // before start to return the response
  // ensure all of the response is safe and error handler
  try {
    const res = await fetch(accessUrl, {
      ...defaultOption,
      ...options,
      body: options?.body ? JSON.stringify(options?.body) : undefined,
    })

    if (res.ok) {
      try {
        const data = await res.json()
        return data
      } catch {
        return null
      }
    } else {
      throw await res.json()
    }
  } catch (error) {
    throw error
  }
}
