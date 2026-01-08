<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
const { signIn } = useAuth()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  await signIn({ email: email.value, password: password.value })
  navigateTo('/drafts')
}
</script>