<script setup lang="ts">
    import { authClient } from "~~/lib/auth-client"

const email = ref("");
const password = ref("");

const login = async () => {
  const { data, error } = await authClient.signIn.email({
    email: email.value,
    password: password.value,
    callbackURL: "/drafts",
  });
  
  if (error) alert("Invalid credentials");
};

const loginWithGithub = async () => {
  await authClient.signIn.social({
    provider: "github",
    callbackURL: "/drafts", // Where to redirect after GitHub returns
  });
};

</script>

<template>
  <div>
  <form @submit.prevent="login">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>

  <div class="divider">OR</div>

    <button @click="loginWithGithub" class="github-btn">
      <img src="https://authjs.dev/img/providers/github.svg" width="20" />
      Continue with GitHub
    </button>

  <div class="divider">OR</div>

  <PhoneSignIn />

  <div class="divider">OR</div>

  <PhoneSignInWithPassword />
</div>

</template>

<style scoped>
  .github-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  background: #24292e;
  color: white;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
}
.divider {
  margin: 20px 0;
  text-align: center;
  color: #666;
}
</style>
