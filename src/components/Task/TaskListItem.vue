<template>
    <div>
        <div class="item columns">
            <div class="column is-three-quarters title-area">
                <div><b>{{this.item.title}}</b></div>
                <div class="div-description">{{this.item.description}}</div>
                <div>{{new Date(this.item.createdAt).toLocaleString()}}</div>
                <div>Active: <input :checked="this.item.isActive" type="checkbox" @change="OnActiveCheckboxChange" v-bind:disabled="isCheckboxDisabled"></div>
                <div>Complete: <input :checked="this.item.isComplete" type="checkbox" @change="OnCompleteCheckboxChange" v-bind:disabled="isCheckboxDisabled"></div>
                <div>Category: <span v-bind:style="styleObject">{{this.item.categoryTitle}}</span></div>
            </div>
            <div class="column is-one-quarter button-area">
                <button class="button is-primary task-list-item-button" @click="$router.push('/task/edit/' + item.id)">Edit</button>
                <button class="button is-danger task-list-item-button" @click="$router.push('/task/remove/' + item.id)">Remove</button>
            </div>
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
                console.log(value.id);
                console.log(value.title);
                console.log(value.description);
                console.log(value.createdAt);
                console.log(value.isActive);
                console.log(value.isComplete);
                console.log(value.categoryId);
                console.log(value.categoryTitle);
                console.log(value.categoryColor);
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
            state: "READY",
                styleObject : {
                color : this.item.categoryColor,
            }
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
    .title-area
    {
        text-align: left;
    }
    .button-area
    {
        text-align: right;
    }
    .task-list-item-button {
        margin: 5px
    }
    .item
    {
        margin-left: 200px;
        border-top: 1px;
        border-bottom: 0px;
        border-left: 0px;
        border-right: 0px;
        border-top-color: rgb(0, 0, 0);
        border-style: solid;
    }
    .div-description
    {
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>