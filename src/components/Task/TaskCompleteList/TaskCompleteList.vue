<template>
    <div>
        <div v-if="this.state === 'LOADING'">
            Loading... Please wait.
        </div>
        <div v-if="this.state === 'READY'">
            <button @click="$router.push('/task/add')">Add</button>
            <task-complete-list-item v-for="item in tasks" v-bind:key="item.id" :item="item"></task-complete-list-item>
        </div>
        <div v-if="this.state === 'LOADING_ERROR'">
            An error has occured while loading the task list.
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import TaskCompleteListItem from './TaskCompleteListItem.vue'

export default {
    name: "task-complete-list",
    props : {
        id : String,
    },
    components:
    {
        TaskCompleteListItem
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
            loadCompleteTaskListAction : "loadCompleteTaskListAction",
        }),
        LoadList()
        {
            this.state = "LOADING";
                this.loadCompleteTaskListAction().then(() => {
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