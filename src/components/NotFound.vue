<template>
    <div class="not-found-page">
        <div>Requested page could not be found. Perhaps the link is wrong?</div>
        <div><button class="button is-primary go-back-button" @click="GoToMainPage">Go to main page</button></div>
    </div>
</template>

<script>
export default {
    name: 'not-found',
    methods: {
        GoToMainPage() {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
    .not-found-page
    {
        font-size: 20px;
    }
    .go-back-button
    {
        margin: 15px;
    }
</style>