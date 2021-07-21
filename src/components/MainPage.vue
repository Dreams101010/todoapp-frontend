<template>
    <div class="main-page">
        <h3 class="is-size-3">Welcome to ToDoApp</h3>
        <p>Here you can add, edit and remove tasks sorted by categories.</p>
        <button class="button is-primary active-tasks-button" @click="GoToActiveTasks">Get me to my active tasks!</button> 
    </div>
</template>

<script>
export default {
    name: 'main-page',
    methods: {
        GoToActiveTasks()
        {
            this.$router.push("/task/active");
        }
    }
}
</script>

<style scoped>
    .main-page
    {
        font-size: 20px;
    }
    .active-tasks-button
    {
        margin: 15px;
    }
</style>