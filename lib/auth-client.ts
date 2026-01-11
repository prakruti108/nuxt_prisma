import { createAuthClient } from "better-auth/vue"
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: (config.public.betterAuthUrl as string) || 'http://dev.konsoftech.in:3000',
    /** The secret key used to sign tokens (required) */
    secret: (config.public.betterAuthSecret as string) || 'somesecretkey',
})