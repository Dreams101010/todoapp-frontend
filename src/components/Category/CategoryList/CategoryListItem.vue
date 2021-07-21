<template>
    <div v-bind:style="styleObject">
        <div>
            {{this.item.title}}
        </div>
        <div>
            <button @click="$router.push('/category/edit/' + item.id)">Edit</button>
            <button @click="$router.push('/category/remove/' + item.id)">Remove</button>
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
</style>