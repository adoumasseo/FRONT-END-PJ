<template>
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.first_name }} {{ user.last_name }}
          <button @click="deleteUser(user.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { getUsers, deleteUser } from '@/services/adminOps';
  
  export default {
    data() {
      return {
        users: [],
      };
    },
    methods: {
      fetchUsers() {
        getUsers()
          .then(response => {
            this.users = response.data.users;
          })
          .catch(error => console.error(error));
      },
      deleteUser(userId) {
        deleteUser(userId)
          .then(() => {
            this.fetchUsers();
          })
          .catch(error => console.error(error));
      },
    },
    mounted() {
      this.fetchUsers();
    },
  };
  </script>
  