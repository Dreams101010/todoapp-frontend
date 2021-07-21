<template>
    <div>
        <div v-if="this.state === 'LOADING'">
            Loading... Please wait.
        </div>
        <div v-if="this.state === 'READY'">
            <button @click="$router.push('/task/add')">Add</button>
            <task-list-item v-for="item in tasks" v-bind:key="item.id" :item="item"></task-list-item>
        </div>
        <div v-if="this.state === 'LOADING_ERROR'">
            An error has occured while loading the task list.
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import TaskListItem from '../TaskListItem.vue'

export default {
    name: "task-active-list",
    components:
    {
        TaskListItem
    },
    data: function() {
        return {
            state : "INITIAL"
        }
    },
    computed:{
        ...mapGetters({
            tasks : "tasks",
        }),
    },
    methods: {
        ...mapActions({
            loadActiveTaskListAction : "loadActiveTaskListAction",
        }),
        LoadList()
        {
            this.state = "LOADING";
                this.loadActiveTaskListAction().then(() => {
                console.log(this.tasks);
                this.state = "READY";
            })
            .catch((error) => {
                console.log(error);
                this.state = "LOADING_ERROR";
            });
        }
    },
    created()
    {
        this.LoadList();
    }
}
</script>