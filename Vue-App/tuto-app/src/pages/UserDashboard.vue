<template>

    <header>
        <h1>Boards List</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam provident, vitae officia natus aperiam rem, porro expedita maxime aut, ab deserunt ipsum earum dolorum totam distinctio doloribus repellat laboriosam nam.
        </p>
    </header>
    <form action="" @submit.prevent="handleCreateBoard" class="addBoard_form">
        <div>
            <label for="boardName">Board name</label>
            <input type="text" v-model="boardName" id="boardName" placeholder="Ex: Faire à manger">
        </div>

        <button>Add new board</button>
    </form>
    <table class="table-auto board_table">
        <thead>
            <tr>
                <th>Board Name</th>
                <th>Board Status</th>
                <th>Created at</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="board in boards">
                <td>{{ board.board_name }}</td>
                <td>{{ board.status }}</td>
                <td>{{ board.created_at }}</td>
                <td>
                    <i class="material-icons board_actions" @click="handleDeleteBoard(board.id)" >delete</i>
                    <router-link :to="`/dashboard/users/${board.id}`"><i
                            class="material-icons board_actions">visibility</i></router-link>
 
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
import { formatDate } from '@/helpers/dateFormat';
import { getBoards, createBoard, deleteBoard } from '@/services/board';
import { ref, onMounted } from 'vue';

const boardName = ref("")
const error = ref("")
const boards = ref([])

const fetchBoard = async () => {
    try {
        const res = await getBoards()
        boards.value = res.data.boards
    }
    catch (err) {
        console.log("Impossible de récupérer les boards", err);
    }
}
const handleCreateBoard = async () => {
    if ((boardName !== "")) {
        const data = {
            "board_name": boardName.value
        }
        try {
            const response = await createBoard(data);
            fetchBoard()

        }
        catch (err) {
            console.log("Can creat Board Fail", err);
            error.value = "Can creat Board Fail"
        }
    }
    else {
        error.value = "A board name can't be empty"
    }
    boardName.value = ""
}
const handleDeleteBoard = async (boardId) => {
    if (confirm("Are you sure to delete this board")) {
        try {
            const response = await deleteBoard(boardId);
            fetchBoard()
        }
        catch (err) {
            console.log("Can delete Board Fail", err);
            alert("You can't delete this board")
        }

    }
}
onMounted(() => {
    fetchBoard()
})

</script>
<style>
h1 {
    color: white;
    width: 70%;
    margin: 20px auto;
    font-size: 25px;
    font-weight: bold;
}

p {
    color: white;
    width: 70%;
    margin: 20px auto;
    text-align: justify;
    font-size: 14px;
}

.addBoard_form {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 70%;
    margin: 20px auto;
}
.addBoard_form div
{
    display: flex;
    flex-direction: column;
    margin-right: 25px;
}
.addBoard_form div label
{
    color: white;
    font-size: 13px;
}
.addBoard_form div input {
    background-color: transparent;
    outline: none;
    height: 40px;
    border: 0;
    border-bottom: 1px solid white;
    color: white;
    font-size: 15px;
}

.addBoard_form button
{
    width: fit-content;
    padding: 0px 10px;
    background: white;
    height: 40px;
    border-radius: 10px;
}
.board_table {
    width: 70%;
    margin: 20px auto;
    color: white;
}
.board_table thead
{
    height: 45px;
    background: white;
    color: black;
}
.board_table thead tr th
{
    text-align: start;
}

.board_table tbody tr
{
    height: 50px;
    border-bottom: 1px solid white;
    font-size: 14px;
}
.board_table .board_actions
{
    font-size: 20px;
    margin-right: 15px;
}

</style>