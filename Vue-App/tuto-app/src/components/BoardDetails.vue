<template>
    <div class="board_details_content">
        <h1 class="">{{ board.board_name }}</h1>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium voluptate, ad, perspiciatis, at
            obcaecati quia pariatur quis optio reprehenderit unde illum. Voluptatibus consectetur suscipit iusto
            nostrum temporibus qui voluptates quidem!
        </p>
        <div class="taskByStatus">
            <!-- Section des tâches à faire -->
            <section>
                <h2 class="title_status_title todo">To do</h2>
                <div v-if="tasksByStatus.todo.length">
                    <div v-for="task in tasksByStatus.todo" :key="task.id" class="task">
                        <div v-if="editingTaskId === task.id" class="edit_content">
                            <input v-model="editedContent" placeholder="Modifier la tâche" />
                            <select v-model="editedStatus">
                                <option value="todo">To Do</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                            <div>
                                <button @click="handleUpdateTask(task.id)"><i class="material-icons">save</i></button>
                                <button @click="cancelEdit"><i class="material-icons">close</i></button>
                            </div>
                        </div>
                        <div v-else class="task_content">
                            <div>{{ task.content }}</div>
                            <span>
                                <button @click="startEdit(task)"><i class="material-icons">edit</i></button>
                                <button @click="handleDeleteTask(task.id)"><i class="material-icons">delete</i></button>
                            </span>
                        </div>
                    </div>
                </div>
                <p v-else>No tasks TODO</p>


                <form @submit.prevent="handleCreateTask" class="addTaskForm">
                    <input type="text" v-model="content" placeholder="Nouvelle tâche">
                    <button>Ajouter</button>
                    <p v-if="error">{{ error }}</p>
                </form>
            </section>

            <!-- Section des tâches en cours -->
            <section>
                <h2 class="title_status_title doing">Doing</h2>
                <div v-if="tasksByStatus.doing.length">
                    <div v-for="task in tasksByStatus.doing" :key="task.id" class="task">
                        <div v-if="editingTaskId === task.id" class="edit_content">
                            <input v-model="editedContent" placeholder="Modifier la tâche" />
                            <select v-model="editedStatus">
                                <option value="todo">To Do</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                            <div>
                                <button @click="handleUpdateTask(task.id)"><i class="material-icons">save</i></button>
                                <button @click="cancelEdit"><i class="material-icons">close</i></button>
                            </div>
                        </div>
                        <div v-else class="task_content">
                            <div>{{ task.content }}</div>
                            <span>
                                <button @click="startEdit(task)"><i class="material-icons">edit</i></button>
                                <button @click="handleDeleteTask(task.id)"><i class="material-icons">delete</i></button>
                            </span>
                        </div>
                    </div>
                </div>
                <p v-else>No tasks at the DOING stage</p>
            </section>

            <!-- Section des tâches terminées -->
            <section>
                <h2 class="title_status_title done">Done</h2>
                <div v-if="tasksByStatus.done.length">
                    <div v-for="task in tasksByStatus.done" :key="task.id" class="task">
                        <div v-if="editingTaskId === task.id" class="edit_content">
                            <input v-model="editedContent" placeholder="Modifier la tâche" />
                            <select v-model="editedStatus">
                                <option value="todo">To Do</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                            <div>
                                <button @click="handleUpdateTask(task.id)"><i class="material-icons">save</i></button>
                                <button @click="cancelEdit"><i class="material-icons">close</i></button>
                            </div>
                        </div>
                        <div v-else class="task_content">
                            <div>{{ task.content }}</div>
                            <span>
                                <button @click="startEdit(task)"><i class="material-icons">edit</i></button>
                                <button @click="handleDeleteTask(task.id)"><i class="material-icons">delete</i></button>
                            </span>
                        </div>
                    </div>
                </div>
                <p v-else>No tasks DONE</p>
            </section>

        </div>
    </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBoardsTasks, createTask, updateTask, deleteTask } from '@/services/task';

const route = useRoute();
const content = ref("");
const error = ref("");
const tasks = ref([]);
const board = ref({});
const editingTaskId = ref(null);
const editedContent = ref("");
const editedStatus = ref("todo");


const fetchTasksBoards = async () => {
    try {
        const res = await getBoardsTasks(route.params.boardId);
        board.value = res.data.board;
        tasks.value = res.data.tasks;
    } catch (err) {
        console.log("Impossible de récupérer le board et les tâches", err);
    }
};


const tasksByStatus = computed(() => {
    return {
        todo: tasks.value.filter(task => task.status === 'todo'),
        doing: tasks.value.filter(task => task.status === 'doing'),
        done: tasks.value.filter(task => task.status === 'done'),
    };
});


const handleCreateTask = async () => {
    if (content.value !== "") {
        try {
            const res = await createTask(route.params.boardId, { content: content.value });
            console.log(res);
            fetchTasksBoards();
            content.value = "";
            error.value = ""
        } catch (err) {
            console.log("Impossible de créer une tâche", err);
            error.value = "Impossible de créer une tâche";
        }
    } else {
        error.value = "Le champ ne doit pas être vide";
    }
};


const startEdit = (task) => {
    editingTaskId.value = task.id;
    editedContent.value = task.content;
    editedStatus.value = task.status;
};

const cancelEdit = () => {
    editingTaskId.value = null;
    editedContent.value = "";
    editedStatus.value = "todo";
    error.value = ""
};


const handleUpdateTask = async (taskId) => {
    if (editedContent.value !== "") {
        try {
            await updateTask(taskId, { content: editedContent.value, status: editedStatus.value });
            fetchTasksBoards();
            cancelEdit();
        } catch (err) {
            console.log("Impossible de mettre à jour la tâche", err);
            error.value = "Impossible de mettre à jour la tâche";
        }
    } else {
        error.value = "Le champ ne doit pas être vide";
    }
};

const handleDeleteTask = async (taskId) => {
    if (confirm("Voulez vous supprimer cette tâche ?")) {
        try {
            await deleteTask(route.params.boardId, taskId);
            fetchTasksBoards();
        } catch (err) {
            console.log("Impossible de supprimer la tâche", err);
            error.value = "Impossible de supprimer la tâche";
        }
    }
};

onMounted(() => {
    fetchTasksBoards();
});
</script>
<style scoped>
.board_details_content {
    max-height: 100vh;
    overflow: scroll;
}

.board_details_content h1,
.board_details_content p {
    width: 98%;
}


.taskByStatus {
    display: flex;
    justify-content: space-between;
    width: 98%;
    margin: 0 auto;
}

.taskByStatus section {
    width: 350px;
}

.title_status_title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    border-radius: 10px;
}

.todo {
    background-color: rgba(216, 28, 28, 0.596);
}

.doing {
    background-color: rgba(179, 127, 15, 0.596);
}

.done {
    background-color: rgba(15, 179, 97, 0.596);

}


.task_content, .edit_content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 10px 0px;
    border-radius: 10px;
    background: rgb(42, 42, 42);
}

.task_content div , .edit_content input{
    width: 80%;
    height: 40px;
    overflow: scroll;
    display: flex;
    align-items: center;
    padding-left: 5px;
    color: white;
    font-size: 14px;
}
.edit_content input
{
    background-color: transparent;
    outline: none;
}
.task_content span, .edit_content div{
    width: 20%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.task_content i, .edit_content i {
    color: white;
    padding-top: 5px;
    font-size: 18px;
}

.edit_content select
{
    background-color: transparent;
    color: white;
}
.addTaskForm
{
    margin-top: 30px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
}
.addTaskForm input
{
    outline: none;
    height: 40px;
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid white;
    color: white;
    font-size: 14px;
}
.addTaskForm button
{
    
    width: 80px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    font-size: 14px;
    border-radius: 10px;
}
</style>
