import { createAuthClient } from "better-auth/vue"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: useRuntimeConfig().public.betterAuthUrl || 'https://nuxt-prisma-gltp.vercel.app/',
    /** The secret key used to sign tokens (required) */
    secret: useRuntimeConfig().public.betterAuthSecret || 'GrnXHfBsH4mNGdJwhJqy5ktWDTIaiVCV',
})