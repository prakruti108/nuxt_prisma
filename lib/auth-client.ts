import { createAuthClient } from "better-auth/vue"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL || 'https://nuxt-prisma-gltp.vercel.app/',
    /** The secret key used to sign tokens (required) */
    secret: process.env.BETTER_AUTH_SECRET || 'GrnXHfBsH4mNGdJwhJqy5ktWDTIaiVCV',
})