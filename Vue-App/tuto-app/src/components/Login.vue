<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" type="email" />
      <input v-model="password" placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    
    // Use refs to hold reactive data
    const email = ref('');
    const password = ref('');
    const error = ref(null);

    async function login() {
      try {
        await store.dispatch('login', { email: email.value, password: password.value });
        router.push('/dashboard');
      } catch (err) {
        // error.value = 'Invalid credentials';
        console.log(err);
         // Update error using ref
      }
    }

    return {
      email,
      password,
      error,
      login,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
