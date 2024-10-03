<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="firstName" type="text" placeholder="First Name" />
      <input v-model="lastName" type="text" placeholder="Last Name" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <input v-model="passwordConfirmation" type="password" placeholder="Confirm Password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { register } from '@/services/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    // Use refs to hold reactive data
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const passwordConfirmation = ref('');

    async function registerUser() {
      const userData = {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      };

      try {
        const response = await register(userData);
        localStorage.setItem('auth_token', response.data.token);
        router.push('/dashboard');
      } catch (error) {
        console.error(error);
      }
    }

    return {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      register: registerUser,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
