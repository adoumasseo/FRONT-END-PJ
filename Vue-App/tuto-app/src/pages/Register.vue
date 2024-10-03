<template lang="">
    <form action="" @submit.prevent="handleSubmit">
        <input type="text" id="f_name" v-model ="first_name"/>
        <input type="text" id="l_name" v-model ="last_name"/>
        <input type="email" id="mail" v-model ="email"/>
        <input type="password" id="password" v-model ="password"/>
        <input type="password" id="password_confirmation" v-model ="password_confirmation"/>
        <button>Submit</button>
    </form>
    <div>Déjà un compte ?? 
        <router-link to="/login">Connectez-vous!</router-link>
    </div>
</template>
<script setup>
    import { ref } from 'vue'

    const first_name = ref("")
    const last_name = ref("")
    const email = ref("")
    const password = ref("")
    const password_confirmation = ref("")

    const handleSubmit = () => {
        console.log(
            first_name.value,
            last_name.value,
            email.value,
            password.value,
            password_confirmation.value,
        );
        
    }
</script>
<style ></style>