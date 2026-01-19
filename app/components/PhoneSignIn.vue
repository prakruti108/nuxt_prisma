<!-- components/PhoneSignIn.vue -->
<template>
  <div>
    <form @submit.prevent="sendOTP">
      <input v-model="phoneNumber" type="tel" placeholder="+1234567890" required />
      <button type="submit">Send OTP</button>
    </form>
    <form v-if="step === 2" @submit.prevent="verifyOTP">
      <input v-model="otp" type="text" placeholder="123456" required />
      <button type="submit">Verify</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { authClient } from '~~/lib/auth-client'

const phoneNumber = ref('')
const otp = ref('')
const step = ref(1)

const sendOTP = async () => {
  // await authClient.signIn.phoneNumber({ phoneNumber: phoneNumber.value, password: 'abcd' })
  await authClient.phoneNumber.sendOtp({
    phoneNumber: phoneNumber.value,
  })
  step.value = 2
}

const verifyOTP = async () => {
  await authClient.phoneNumber.verify({
    phoneNumber: phoneNumber.value,
    code: otp.value
  })
  // Redirect or fetch user session
  await navigateTo('/dashboard')
}
</script>