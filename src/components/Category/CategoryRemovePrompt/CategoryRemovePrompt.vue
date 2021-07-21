<template>
    <div>
        <div v-if="this.state === 'READY'" class="mainDialog">
            <div>Do you want to delete this category?</div>
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
    name: "category-remove-prompt",
    data : function() {
        return {
            state : "READY",
        }
    },
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
                // TODO: handle case when category cannot be removed because it still has tasks
        },
        onCancel()
        {
            this.$router.push("/category");
        },
    }
}
</script>