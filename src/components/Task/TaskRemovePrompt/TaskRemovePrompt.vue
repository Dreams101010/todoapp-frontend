<template>
    <div>
        <div v-if="this.state === 'READY'" class="mainDialog">
            <div>Do you want to delete this task?</div>
            <div>
                <button @click="onDelete">Yes</button>
                <button @click="onCancel">No</button>
            </div>
        </div>
        <div v-if="this.state === 'ERROR'" class="errorMessage">
            <div>An error has occured</div>
            <button @click="onCancel">Go back</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'task-remove-prompt',
    data : function() {
        return {
            state : "READY",
        }
    },
    props: ['id'],
    methods: {
        ...mapActions(
            {
                taskRemove : "taskRemove",
            }
        ),
        onDelete()
        {
            this.taskRemove(this.id)
                .then(() => this.$router.go(-1))
                .catch(() => this.state = "ERROR");
                // TODO: handle 404
                // TODO: handle case when category cannot be removed because it still has tasks
                // TODO: handle empty history case
        },
        onCancel()
        {
            this.$router.go(-1);
        },
    }
}
</script>