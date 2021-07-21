<template>
    <div>
        <div v-if="this.state === 'READY'" class="mainDialog">
            <div class="is-size-4">Do you want to delete this task?</div>
            <div>
                <button class="button is-danger remove-prompt-button" @click="onDelete">Yes</button>
                <button class="button is-primary remove-prompt-button" @click="onCancel">No</button>
            </div>
        </div>
        <div v-if="this.state === 'ERROR'" class="errorMessage">
            <div>{{this.errorMessage}}</div>
            <div>
                <button class="button is-primary" @click="onCancel">Go back</button>
            </div>
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
                taskRemove : "taskRemove",
            }
        ),
        onDelete()
        {
            this.taskRemove(this.id)
                .then(() => this.$router.go(-1))
                .catch((error) => 
                {
                    if (error.code === "ECONNABORTED")
                    {
                        this.errorMessage = "Could not connect to the server.";
                        return;
                    }
                    if (error.response.status === 400)
                    {
                        this.state = "ERROR";
                        this.errorMessage = "Client error has occured";
                    }
                    if (error.response.status === 500)
                    {
                        this.state = "ERROR";
                        if (error.response.data.message)
                        {
                            if (error.response.data.message === "Error: Foreign key violation")
                            {
                                this.errorMessage = "Cannot remove category which contains tasks.";
                            }
                            else
                            {
                                this.errorMessage = "Server error has occured.";
                            }
                        }
                    }
                    else if (error.response.status === 404)
                    {
                        this.state = "ERROR";
                        this.errorMessage = "Could not find the category which you're trying to remove.";
                    }
                });
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