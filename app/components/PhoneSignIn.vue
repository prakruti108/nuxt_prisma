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
    <form v-if="step === 3" @submit.prevent="setPassword">
      <input v-model="rotp" type="text" placeholder="123456" required />
      <input v-model="password" type="text" placeholder="123456" required />
      <button type="submit">Set Password</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { auth } from '~~/lib/auth'
import { authClient } from '~~/lib/auth-client'

const phoneNumber = ref('')
const otp = ref('')
const rotp = ref('')
const password = ref('')
const step = ref(1)

const sendOTP = async () => {
  // await authClient.signIn.phoneNumber({ phoneNumber: phoneNumber.value, password: 'abcd' })
  authClient.phoneNumber.sendOtp({
    phoneNumber: phoneNumber.value,
  })
  step.value = 2
}

const verifyOTP = async () => {
  const {data,error} = await authClient.phoneNumber.verify({
    phoneNumber: phoneNumber.value,
    code: otp.value
  })
  console.log('Verfication Data:', data)
  console.log('Verfication Error:', error)
  // authClient.phoneNumber.resetPassword({
  //   otp: otp.value,
  //   phoneNumber: phoneNumber.value,
  //   newPassword: 'harekrishna'
  // })
  if(error){
    console.error('OTP Verification Error:', error)
    return
  }
  console.log('OTP Verified:', data)

  authClient.phoneNumber.requestPasswordReset({
    phoneNumber: phoneNumber.value,
  })

  step.value = 3
}

const setPassword = async () => {
  await $fetch('/register', {
    method: 'POST',
    body: {
      phoneNumber: phoneNumber.value,
      otp: rotp.value,
      password: password.value,
    }
  })
  // const {data,error} = await authClient.phoneNumber.resetPassword({
  //   phoneNumber: phoneNumber.value,
  //   otp: rotp.value,
  //   newPassword: password.value,
  // })
  // if(error){
  //   console.error('Set Password Error:', error)
  //   return
  // }
  // console.log('Password Set:', data)
  await navigateTo('/drafts')
}
</script>