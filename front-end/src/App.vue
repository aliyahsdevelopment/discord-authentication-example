<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const user = ref(null)

onMounted(async () => {
    const storedUser = localStorage.getItem('user')
    console.log(storedUser);

    if (storedUser) {
        user.value = JSON.parse(storedUser)
    } else {
        try {
            const response = await axios.get('http://localhost:3000/user', { withCredentials: true })
            user.value = response.data
            localStorage.setItem('user', JSON.stringify(user.value))
        } catch (err) {
            console.log('User is not authenticated')
        }
    }
})

const logout = async () => {
    try {
        const response = await axios.get('http://localhost:3000/logout', { withCredentials: true });  // Send logout request with credentials
        console.log(response);

        localStorage.removeItem('user');
        user.value = null;

        window.location.href = '/'
    } catch (err) {
        console.log('Error logging out:', err);
    }
};
const login = () => {
    window.location.href = 'http://localhost:3000/login';
};
</script>

<template>
    <main>
        <header>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/user">User Info</RouterLink>
                <button class="logout" v-if="user" @click="logout">Logout</button>
                <button class="login" v-else-if="!user" @click="login">Login</button>
            </nav>
        </header>

        <RouterView />
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
}
header {
    line-height: 1.5;
    width: 100%;
    position: absolute;
    top: 0;
}

nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;
    font-size: 12px;
    text-align: center;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}

button {
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    background-color: #ff3b30;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #d32f2f;
}

.login {
    background-color: #007aff;
}
.login:hover {
    background-color: #0056b3;
}
</style>
