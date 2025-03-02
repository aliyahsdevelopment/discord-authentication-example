<template>
    <div v-if="!user">
        <h2>Login</h2>
        <p>To access the site, please log in with your Discord account.</p>
        <button @click="loginWithDiscord">Login with Discord</button>
    </div>

    <div v-else>
        <h2>Already Logged In</h2>
        <p>You're already logged in as {{ user.username }}. <RouterLink to="/user">Go to User Info</RouterLink></p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref(null)
const router = useRouter()

// Check if the user is already logged in by looking for data in localStorage
if (localStorage.getItem('user')) {
    user.value = JSON.parse(localStorage.getItem('user'))
}

// Redirect to Discord login route
const loginWithDiscord = () => {
    window.location.href = 'http://localhost:3000/login'
}
</script>

<style scoped>
/* Basic styling for the login page */
div {
    text-align: center;
    padding: 2rem;
}

button {
    padding: 1rem 2rem;
    font-size: 1rem;
    background-color: #7289da;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #5f73a1;
}
</style>
