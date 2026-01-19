<!-- components/PhoneSignIn.vue -->
<template>
  <div>
    <form @submit.prevent="signin">
      <input v-model="phoneNumber" type="tel" placeholder="+1234567890" required />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { authClient } from '~~/lib/auth-client'

const phoneNumber = ref('')
const password = ref('')

const signin = async () => {
  const {data,error} = await authClient.signIn.phoneNumber({
    phoneNumber: phoneNumber.value,
    password: password.value
  })
  if(error){
    console.error('Sign In Error:', error)
    return
  }
  console.log('Signed In:', data)
}

</script>