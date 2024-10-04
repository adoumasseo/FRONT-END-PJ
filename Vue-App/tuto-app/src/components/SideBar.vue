<template>
    <div class="comp_sideBar">
        <div class="header">
            <div>
                <i class="material-icons">app_registration</i>
                Notes of Ortniel
            </div>
        </div>
        <div class="nav-content">
            <router-link to="/dashboard/users" class="link">Your Boards</router-link>
            <router-link to="/admin" class="link">User Management</router-link>
        </div>

        <div class="logout" @click="handleLogout">
            <i class="material-icons">logout</i>
            Logout
        </div>
    </div>
</template>
<script setup>

import { logout } from '@/services/auth';
import { useRouter } from 'vue-router';

const router = useRouter()
const handleLogout = async () => {
    try {
        const response = await logout();
        router.push('/')
    } catch (err) {
        console.log("Can't Logout", err);
    }
}
</script>
<style>
.comp_sideBar {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(37, 37, 37);
    min-height: 100vh;
}

.header {
    width: 80%;
    font-weight: bold;
    margin-top: 25px;
    font-size: 20px;

}

.header div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.829);
    color: black;
    border-radius: 20px;
}

.nav-content {
    width: 75%;
    height: 80px;
    margin-top: 50px;
    padding-left: 15px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.829);
    border-radius: 20px;
}

.nav-content .link {
    width: fit-content;
    position: relative;
    text-decoration: none;
    color: black;
}

.nav-content .link::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    background: black;
    border-radius: 1px;
    transform: scale(0);
    transition: transform 0.4s ease-in-out;
}

.nav-content .link:hover::after {
    transform: scale(1);
}

.logout {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 80%;
    height: 40px;
    margin-top: 280px;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.829);
    border-radius: 20px;
    font-weight: bold;
}
</style>