<template>
    <div>
      <h2>Tasks</h2>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          {{ task.content }} - {{ task.status }}
          <router-link :to="`/tasks/${task.id}`">Edit</router-link>
        </li>
      </ul>
      <button @click="createTask">Create New Task</button>
    </div>
  </template>
  
  <script>
  import { getTasks, createTask } from '@/services/task';
  
  export default {
    props: ['boardId'],
    data() {
      return {
        tasks: [],
      };
    },
    methods: {
      fetchTasks() {
        getTasks(this.boardId)
          .then(response => {
            this.tasks = response.data.tasks;
          })
          .catch(error => console.error(error));
      },
      createTask() {
        // Add task creation logic
      },
    },
    mounted() {
      this.fetchTasks();
    },
  };
  </script>
  