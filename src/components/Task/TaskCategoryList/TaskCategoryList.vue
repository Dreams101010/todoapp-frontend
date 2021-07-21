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
    name: "task-category-list",
    props: {
        id : {
            type : String,
            required: true,
            validator : function(value)
            {
                var number = Number(value);
                return Number.isInteger(number) || number > 0;
            }
        }
    },
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
            loadCategoryTaskListAction : "loadCategoryTaskListAction",
        }),
        LoadList()
        {
            this.state = "LOADING";
                this.loadCategoryTaskListAction(Number(this.id)).then(() => {
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