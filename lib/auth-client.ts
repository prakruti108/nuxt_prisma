import { createAuthClient } from "better-auth/vue"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: useRuntimeConfig().public.BETTER_AUTH_URL || 'http://auth.konsoftech.in:3000',
    /** The secret key used to sign tokens (required) */
    secret: useRuntimeConfig().public.BETTER_AUTH_SECRET || 'somesecretkey',
})