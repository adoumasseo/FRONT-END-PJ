<template>
    <div>
      <h1>Edit Profile</h1>
      <form @submit.prevent="updateProfile">
        <input v-model="user.first_name" type="text" placeholder="First Name" />
        <input v-model="user.last_name" type="text" placeholder="Last Name" />
        <input v-model="user.password" type="password" placeholder="Password" />
        <button type="submit">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  import { updateProfile } from '@/services/user';
  
  export default {
    data() {
      return {
        user: {
          first_name: '',
          last_name: '',
          password: '',
        },
      };
    },
    methods: {
      updateProfile() {
        const userId = this.$route.params.userId;
        updateProfile(userId, this.user)
          .then(() => {
            this.$router.push('/dashboard');
          })
          .catch(error => console.error(error));
      },
    },
  };
  </script>
  