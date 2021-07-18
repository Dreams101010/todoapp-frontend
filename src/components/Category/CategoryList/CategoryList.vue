<template>
    <div>
        <div v-if="this.state === 'LOADING'">
            Loading... Please wait.
        </div>
        <div v-if="this.state === 'READY'">
            <button @click="$router.push('/category/add')">Add</button>
            <category-list-item v-for="item in categories" v-bind:key="item.id" :item="item"></category-list-item>
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

