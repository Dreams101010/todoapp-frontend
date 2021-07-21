<template>
    <div>
        <div v-if="this.state === 'LOADING'">
            Loading... Please wait.
        </div>
        <div v-if="this.state === 'READY'">
            <div class="columns is-vcentered">
                <div class="column text-left-align">
                    <div class="is-size-4">Categories:</div>
                </div>
                <div class="column text-right-align">
                    <button class="button is-primary category-list-button" @click="$router.push('/category/add')">Add category</button>
                </div>
            </div>
            <div class="item-section">
                <category-list-item v-for="item in categories" v-bind:key="item.id" :item="item"></category-list-item>
            </div>
        </div>
        <div v-if="this.state === 'LOADING_ERROR'">
            An error has occured while loading the category list.
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import CategoryListItem from './CategoryListItem.vue';

export default {
    name: "category-list",
    components: { CategoryListItem },
    data: function() {
        return {
            state : "INITIAL"
        }
    },
    computed:{
        ...mapGetters({
            categories : "categories",
        }),
    },
    methods: {
        ...mapActions({
            loadCategoryListAction : "loadCategoryListAction",
        }),
        LoadList()
        {
            this.state = "LOADING";
                this.loadCategoryListAction().then(() => {
                this.state = "READY";
                console.log(this.categories);
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

<style>
    .category-list-button {
        margin: 5px
    }

    .item-section {
        margin-top: 12px
    }

    .text-left-align
    {
        text-align: left;
    }

    .text-right-align
    {
        text-align: right;
    }
</style>

