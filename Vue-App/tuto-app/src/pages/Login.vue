<template>
    <h1>Login</h1>
    <form action="" @submit.prevent="handleSubmit" class="form">

        <label for="email">Mail*</label>
        <input type="email" id="mail" v-model="email" placeholder="Ex: adoumasseo@gmail.com">

        <label for="password">Password*</label>
        <input type="password" id="password" v-model="password" />
        <div class="err" v-if="error !== null">
            {{ error }}
        </div>
        <div v-else></div>

        <button>Submit</button>
    </form>


    <div class="redirect_login">No account??
        <router-link to="/register" class="link">create one !</router-link>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { login } from '@/services/auth';

const router = useRouter()
const error = ref(null)

const email = ref("")
const password = ref("")

const handleSubmit = async () => {

    const data = {
        "email": email.value,
        "password": password.value,
    }

    try {
        const response = await login(data);
        router.push('/dashboard/users')
    } catch (err) {
        error.value = "Invalids Credentials"
    }
}
</script>
<style>
h1 {
    color: white;
    width: 70%;
    margin: 20px auto;
}

.form {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 20px auto;
}

.form input {
    background-color: transparent;
    outline: none;
    width: 400px;
    height: 30px;
    border: 0;
    border-bottom: 1px solid white;
    margin-bottom: 10px;
    color: white;
    font-size: 15px;
}

.form label {
    color: white;
    font-size: 13px;
}

.form button {
    width: 400px;
    height: 40px;
    font-size: 15px;
    background-color: white;
    border: 0;
    outline: none;
    margin-top: 15px;
    border-radius: 10px;
    cursor: pointer;
}

.redirect_login {
    width: 70%;
    margin: 0 auto;
    color: white;
}

.redirect_login .link {
    color: white;
}

.err {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 40px;
    color: rgb(199, 10, 10);
    background: rgba(207, 17, 17, 0.164);
    border-radius: 10px;
}
</style>