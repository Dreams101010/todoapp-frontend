import { createRouter, createWebHistory } from 'vue-router';
import CategoryList from '../components/Category/CategoryList/CategoryList.vue';
import NotFound from '../components/NotFound.vue'
import Main from '../components/Main.vue'
import CategoryAddForm from '../components/Category/CategoryAddForm/CategoryAddForm.vue';
import CategoryEditForm from '../components/Category/CategoryEditForm/CategoryEditForm.vue';
import CategoryRemovePrompt from '../components/Category/CategoryRemovePrompt/CategoryRemovePrompt.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/category',
            component: CategoryList
        },
        {
            path: '/category/add',
            component: CategoryAddForm
        },
        {
            path: '/category/edit/:id',
            component: CategoryEditForm,
            props: true
        },
        {
            path: '/category/remove/:id',
            component: CategoryRemovePrompt,
            props: true
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFound
        }
    ]
});

export default router;