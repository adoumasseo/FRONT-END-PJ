<template>
  <div id="app">
    <div class="sidebar">
      <SideBar />
    </div>
    <div class="app-content">
      <div v-if="$route.path === '/'" class="default_app_content">
        <img src="/public/images/home.png" alt="Home Image">
        <div class="explanatory_text">
          <h1>
            WELCOME TO NOTES
          </h1>
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti minus officia, ipsam, exercitationem
            voluptate nihil ex illum quia eos blanditiis quo assumenda veritatis obcaecati optio sed. Aliquid optio
            distinctio inventore! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eveniet quaerat, eaque
            cumque ducimus at dolores illum mollitia vitae libero enim nulla, voluptatibus nostrum est voluptates optio
            repudiandae voluptate tenetur!
          </div>
          <div class="auth_link">
            <router-link to="/login" class="link">Login</router-link>
            <router-link to="/register" class="link">Register</router-link>
          </div>
        </div>
      </div>
      <RouterView v-else>

      </RouterView>

    </div>
  </div>
</template>

<script setup>
import SideBar from './components/SideBar.vue';
</script>

<style>
#app {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.sidebar {
  min-width: 20%;

}



.app-content {
  min-width: 80%;
}

.default_app_content {
  display: flex;
  width: 800px;
  height: 450px;
  margin: 50px auto;
  border: 1px solid white;
}

.default_app_content img {
  width: 400px;
  height: 400px;
}

.explanatory_text {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: white;
  width: 45%;
}

.explanatory_text div {
  font-size: 14px;
  text-align: justify;
}

.explanatory_text .auth_link {
  display: flex;
  justify-content: space-between;
}

.explanatory_text .auth_link .link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  padding: 2px 10px;
  height: 30px;
  color: black;
  background-color: rgba(255, 255, 255, 0.829);
  border-radius: 15px;
  text-decoration: none;
  font-weight: bold;
}
</style>
