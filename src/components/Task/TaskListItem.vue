<template>
    <div>
        <div>
            <div>{{this.item.title}}</div>
            <div>{{this.item.description}}</div>
            <div>{{new Date(this.item.createdAt).toLocaleString()}}</div>
            <div>Active: <input :checked="this.item.isActive" type="checkbox" @change="OnActiveCheckboxChange" v-bind:disabled="isCheckboxDisabled"></div>
            <div>Complete: <input :checked="this.item.isComplete" type="checkbox" @change="OnCompleteCheckboxChange" v-bind:disabled="isCheckboxDisabled"></div>
            <div>Category: {{this.item.categoryTitle}}</div>
        </div>
        <div>
            <button @click="$router.push('/task/edit/' + item.id)">Edit</button>
            <button @click="$router.push('/task/remove/' + item.id)">Remove</button>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'task-list-item',
    computed:{
        isCheckboxDisabled : function () 
        {
            console.log(`computed: ${this.state}`)
            return this.state !== 'READY';
        },
    },
    props: {
        item : {
            type : Object,
            required: true,
            validator : function (value)
            {
                if (value.id && value.title && value.description &&
                    value.createdAt && value.isActive && value.isComplete && 
                    value.categoryId && value.categoryTitle && value.categoryColor)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    },
    data : function() {
        return {
            state: "READY"
        }
    },
    methods: {
        ...mapActions({
            editTask : "taskEdit",
        }),
        SetState(state)
        {
            this.state = state;
        },
        /* 
            this method is implemented with promise because
           check for disabled binding happens AFTER method has completed
           therefore we set state and create a promise, method completes
           and checkboxes become disabled. then promise either resolves 
           or rejects and in both cases we set state to READY and that 
           enables checkboxes
        */
        OnActiveCheckboxChange(evt)
        {
            this.SetState("SAVING");
            // eslint-disable-next-line no-unused-vars
            var promise = new Promise((resolve, reject) => {
                console.log(this.state);
                var task = {
                    id : this.item.id,
                    title : this.item.title,
                    description: this.item.description,
                    createdAt: this.item.createdAt,
                    isActive: evt.target.checked,
                    isComplete: this.item.isComplete,
                    categoryId : this.item.categoryId,
                }
                this.editTask(task).then(() => {
                    this.SetState("READY");
                }).catch(() => {
                    evt.target.checked = !evt.target.checked;
                    this.SetState("READY");
                });
            }
            );
        },
        OnCompleteCheckboxChange(evt)
        {
            this.SetState("SAVING");
            // eslint-disable-next-line no-unused-vars
            var promise = new Promise((resolve, reject) => {
                console.log(this.state);
                var task = {
                    id : this.item.id,
                    title : this.item.title,
                    description: this.item.description,
                    createdAt: this.item.createdAt,
                    isActive: this.item.isActive,
                    isComplete: evt.target.checked,
                    categoryId : this.item.categoryId,
                }
                this.editTask(task).then(() => {
                    this.SetState("READY");
                }).catch(() => {
                    evt.target.checked = !evt.target.checked;
                    this.SetState("READY");
                });
            });
        },
    },
}
</script>

<style>
    button {
        margin-right: 5px;
    }
</style>