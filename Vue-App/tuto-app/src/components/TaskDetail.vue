<template>
    <div>
      <h2>Edit Task</h2>
      <form @submit.prevent="updateTask">
        <input v-model="task.content" type="text" placeholder="Task Content" />
        <select v-model="task.status">
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button type="submit">Save</button>
      </form>
      <button @click="deleteTask">Delete Task</button>
    </div>
  </template>
  
  <script>
  import { getTaskById, updateTask, deleteTask } from '@/services/task';
  
  export default {
    data() {
      return {
        task: {},
      };
    },
    methods: {
      fetchTask() {
        const taskId = this.$route.params.taskId;
        getTaskById(taskId)
          .then(response => {
            this.task = response.data.task;
          })
          .catch(error => console.error(error));
      },
      updateTask() {
        const taskId = this.$route.params.taskId;
        updateTask(taskId, this.task)
          .then(() => {
            this.$router.push(`/boards/${this.task.board_id}`);
          })
          .catch(error => console.error(error));
      },
      deleteTask() {
        const taskId = this.$route.params.taskId;
        deleteTask(taskId)
          .then(() => {
            this.$router.push(`/boards/${this.task.board_id}`);
          })
          .catch(error => console.error(error));
      },
    },
    mounted() {
      this.fetchTask();
    },
  };
  </script>
  