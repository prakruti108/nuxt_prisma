import { createAuthClient } from "better-auth/vue"

const config = useRuntimeConfig()

console.log('Auth Client Config:', {
    baseURL: config?.public?.betterAuthUrl,
    secret: config?.public?.betterAuthSecret,
})

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL || 'https://nuxt-prisma-gltp.vercel.app/',
    /** The secret key used to sign tokens (required) */
    secret: process.env.BETTER_AUTH_SECRET || 'GrnXHfBsH4mNGdJwhJqy5ktWDTIaiVCV',
})