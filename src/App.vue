<template>
  <div>
    <div v-if="this.state === 'READY'">
        <div class='header columns is-vcentered'>
          <div class="column app-title">
            ToDoApp
          </div>
          <div class="column header-links">
            <router-link class="link" to='/'>Main page</router-link>
            <router-link class="link" to='/category'>Categories</router-link>
            <router-link class="link" to='/task/active'>Active tasks</router-link>
            <router-link class="link" to='/task/complete'>Complete tasks</router-link>
          </div>
        </div>
        <div class="sidenav">
          <div>Categories:</div>
          <router-link class="link" v-bind:key="category.id" v-for="category in categories" :to="{ path : '/task/category/' + category.id}">{{category.title}}</router-link>
        </div>
        <router-view :key="$route.fullPath" class="main"></router-view>
    </div>
    <div v-if="this.state === 'ERROR'">
      Error while loading the app.
      <button @click="this.LoadCategories">Retry</button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'App',
  data: function() {
    return {
      state: "INITIAL",
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
        LoadCategories()
        {
            this.state = "LOADING";
                this.loadCategoryListAction().then(() => {
                this.state = "READY";
                console.log(this.categories);
            })
            .catch((error) => {
                console.log(error);
                this.state = "ERROR";
            });
        }
    },
    created()
    {
        this.LoadCategories();
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header {
  padding-right: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
  background: rgb(133, 235, 155);
  color: white;
  font-size: 20px;
}

.link {
  padding : 5px;
}

.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 160px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: rgb(133, 235, 155);
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
  padding: 6px 8px 6px 16px;
  margin-top: 110px;
  
}

/* The navigation menu links */
.sidenav a {
  text-decoration: none;
  font-size: 15px;
  color: #818181;
  display: block;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}

/* Style page content */
.main {
  margin-left: 160px; /* Same as the width of the sidebar */
  padding: 0px 10px;
  text-align: center;
}

.app-title
{
  margin-left: 15px;
  text-align: left;
  color: black;
  font-size: 30px;
}

.header-links
{
  text-align: right;
}

/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
