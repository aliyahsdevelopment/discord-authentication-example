<template>
    <div v-if="user" class="user-info">
        <h2>User Info</h2>
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Discord ID:</strong> {{ user.id }}</p>
        <p><strong>Avatar:</strong></p>
        <img :src="'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + '.png'" alt="User Avatar" />
    </div>
    <div v-else>
        <p>Loading user information...</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref(null)

onMounted(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
        user.value = JSON.parse(storedUser)
    } else {
        window.location.href = '/login'
    }
})
</script>

<style scoped>
.user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
div {
    text-align: center;
}
</style>
