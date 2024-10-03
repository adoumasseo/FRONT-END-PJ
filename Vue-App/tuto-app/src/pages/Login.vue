<template >
    <div>
       <form action="" @submit.prevent="handleSubmit">
            <label for="mail">Email</label>
            <input type="email" id="mail" placeholder="email" v-model="email">
            <label for="password">Password</label>
            <input type="password" id="password"  v-model="password">
            <button>Submit</button>
       </form> 
       <div>pas de compte ? 
        <router-link to="/register">créer en un</router-link>
       </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue'
    const email = ref("")
    const password = ref("")
    
    const handleSubmit = () => {
        console.log(email.value, password.value);   
    }

</script>
<style setup>
    
</style>