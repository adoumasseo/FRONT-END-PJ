<template>
  <div>
    <h1>Your Boards</h1>
    <ul>
      <li v-for="board in boards" :key="board.id">
        <router-link :to="`/dashboard/boards-show/`">{{ board.board_name }}</router-link>
      </li>
    </ul>
    <form action="" @submit.prevent="createBoard">
      <input type="text" v-model="board_name">
      <button >Create New Board</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getBoards, createBoard as createBoardService } from '@/services/board';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const boards = ref([]);
    const router = useRouter();
    const board_name = ref('')
    async function fetchBoards() {
      try {
        const response = await getBoards();
        boards.value = response.data.boards;
      } catch (error) {
        console.error(error);
      }
    }

    async function createBoard() {
      // Logic to create a new board
      const data = {
        board_name: board_name.value
      }
      
      try {
        const response = await createBoardService(data);
        console.log(response.data.board);
        // Assuming you want to redirect to the new board page after creation
        router.push(`/dashboard/boards-show/`);
        
        fetchBoards(); // Fetch updated boards
      } catch (error) {
        console.error(error);
      }
    }

    // Fetch boards when the component is mounted
    onMounted(fetchBoards);

    return {
      boards,
      board_name,
      createBoard,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
