<template>
  <div>
    <h1>{{ board.board_name }}</h1>
    <TaskList :boardId="board.id" />
    <button @click="deleteBoard">Delete Board</button>
  </div>
</template>

<script>
import { getBoardById, deleteBoard } from '@/services/board';
import TaskList from '@/components/TaskList.vue';

export default {
  components: {
    TaskList,
  },
  data() {
    return {
      board: {},
    };
  },
  methods: {
    fetchBoard() {
      const boardId = this.$route.params.boardId;
      getBoardById(boardId)
        .then(response => {
          this.board = response.data.board;
        })
        .catch(error => console.error(error));
    },
    deleteBoard() {
      const boardId = this.$route.params.boardId;
      deleteBoard(boardId)
        .then(() => {
          this.$router.push('/dashboard');
        })
        .catch(error => console.error(error));
    },
  },
  mounted() {
    this.fetchBoard();
  },
};
</script>
