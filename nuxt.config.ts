export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [],
  app: {
    head: {
      title: 'Nuxt-Prisma Example (TypeScript)',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  vite: {
    server: {
      allowedHosts: ['dev.konsoftech.in', 'localhost', 'nuxt-prisma-gltp.vercel.app'],
    },
  },  
runtimeConfig: {
    // Private keys are only available server-side (can be overridden by NUXT_API_SECRET_TOKEN)
    betterAuthSecretPrivate: process.env.BETTER_AUTH_SECRET || 'default_secret',
    public: {
      // Public keys are exposed to the client-side (can be overridden by NUXT_PUBLIC_API_BASE)
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api',
      betterAuthUrl: process.env.NUXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000',
      betterAuthSecret: process.env.NUXT_PUBLIC_BETTER_AUTH_SECRET || 'default_secret',
    }
  }  
});