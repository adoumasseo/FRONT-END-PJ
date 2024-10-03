<template>
    <h1>Register</h1>
    <form action="" @submit.prevent="handleSubmit" class="form">
        <label for="f_name">First name*</label>
        <input type="text" id="f_name" v-model="first_name" placeholder="Ex: Ortniel" />

        <label for="l_name">Last name*</label>
        <input type="text" id="l_name" v-model="last_name" placeholder="Ex: ADOUMASSE" />

        <label for="email">Mail*</label>
        <input type="email" id="mail" v-model="email" placeholder="Ex: adoumasseo@gmail.com">

        <label for="password">Password*</label>
        <input type="password" id="password" v-model="password" />

        <label for="password_confirmation">Confirm Password*</label>
        <input type="password" id="password_confirmation" v-model="password_confirmation" />
        <button>Submit</button>
    </form>
    <div class="err" v-if="error !== null">
        {{ error }}
    </div>
    <div v-else></div>
    <div class="redirect_login">Already have an account ??
        <router-link to="/login" class="link">Connectez-vous!</router-link>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { register } from '@/services/auth';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter()
const error = ref(null)
const first_name = ref("")
const last_name = ref("")
const email = ref("")
const password = ref("")
const password_confirmation = ref("")

const checkData = () => {
    if 
    (
        first_name.value === "" || last_name.value === ""
        || email.value === "" || password.value === ""
        || password_confirmation.value ===""
    )  
    {
        error.value = "All fields are required. Please fill them"
        return 0
    }
    else if (password.value != password_confirmation.value)
    {
        error.value = "passwords do not match"
        return 0
    }
    else if (password.value.length < 8)
    {
        error.value = "Password too weak"
        return 0
    }
    else
    {
        error.value = null
        return 1
    }
}

const handleSubmit = async () => {
    if (checkData()) {
        const data = {
            "first_name": first_name.value,
            "last_name": last_name.value,
            "email": email.value,
            "password": password.value,
            "password_confirmation": password.value,
            "profile": null,
        }

        try{
            await store.dispatch('register', data);
            router.push('/dashboard/users')
        }catch  (err) { 
            console.log(err);
        }
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
.err
{
    width: 70%;
    margin: 10px auto;
    color: red;
}
</style>