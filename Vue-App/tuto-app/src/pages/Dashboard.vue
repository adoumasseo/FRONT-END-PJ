<template>
  <div>
    <h1>Dashboard</h1>
    <BoardList />
  </div>
</template>

<script>
import BoardList from '@/components/BoardList.vue';

export default {
  components: {
    BoardList,
  },
};
</script>
