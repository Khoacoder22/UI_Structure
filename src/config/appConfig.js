import { env } from './env'

export const appConfig = {
  name: env.appName,
  version: env.appVersion,
  description: 'Frontend-only administration dashboard',
}