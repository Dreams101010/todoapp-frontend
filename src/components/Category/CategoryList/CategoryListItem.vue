<template>
    <div class="item columns" v-bind:style="styleObject">
        <div class="column is-three-quarters title-area">
            {{this.item.title}}
        </div>
        <div class="column is-one-quarter button-area">
            <button class="button is-primary category-list-item-button" @click="$router.push('/category/edit/' + item.id)">Edit</button>
            <button class="button is-danger category-list-item-button" @click="$router.push('/category/remove/' + item.id)">Remove</button>
        </div>
    </div>
</template>

<script>

export default {
    name: "category-list-item",
    props: {
        item : {
            type : Object,
            required: true,
            validator : function (value)
            {
                if (value.id && value.title && value.color)
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
            styleObject : {
                color : this.item.color,
            }
        }
    }
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
    .category-list-item-button {
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
</style>