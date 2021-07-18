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
            <button @click="onCancel">No</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data : function() {
        return {
            state : "READY",
        }
    },
    props: ['id'],
    methods: {
        ...mapActions(
            {
                categoryRemove : "categoryRemove",
            }
        ),
        onDelete()
        {
            this.categoryRemove(this.id)
                .then(() => this.$router.push("/category"))
                .catch(() => this.state = "ERROR");
                // TODO: handle 404
        },
        onCancel()
        {
            this.$router.push("/category");
        },
    }
}
</script>