<script setup lang="ts">
    import { authClient } from "~~/lib/auth-client"

const email = ref("");
const password = ref("");
const name = ref("");

const signUp = async () => {
  const { data, error } = await authClient.signUp.email({
    email: email.value,
    password: password.value,
    name: name.value,
    callbackURL: "/create",
  });
  
  if (error) alert(error.message);
};
</script>

<template>
  <form @submit.prevent="signUp">
    <input v-model="name" placeholder="Name" />
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Register</button>
  </form>
</template>
