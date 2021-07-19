<template>
    <div>
        <div>
            <div>{{this.item.title}}</div>
            <div>{{this.item.description}}</div>
            <div>{{new Date(this.item.createdAt).toLocaleString()}}</div>
            <div>Active: <input :checked="this.item.isActive" type="checkbox" disabled></div>
            <div>Complete: <input :checked="this.item.isComplete" type="checkbox" disabled></div>
            <div>Category: {{this.item.categoryTitle}}</div>
        </div>
        <div>
            <button @click="$router.push('/task/edit/' + item.id)">Edit</button>
            <button @click="$router.push('/task/remove/' + item.id)">Remove</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'task-active-list-item',
    props : ["item"],
    data : function() {
        return {
        }
    }
}
</script>

<style>
    button {
        margin-right: 5px;
    }
</style>