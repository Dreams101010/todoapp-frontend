import { createRouter, createWebHistory } from 'vue-router';
import CategoryList from '../components/Category/CategoryList/CategoryList.vue';
import NotFound from '../components/NotFound.vue'
import MainPage from '../components/MainPage.vue'
import CategoryAddForm from '../components/Category/CategoryAddForm/CategoryAddForm.vue';
import CategoryEditForm from '../components/Category/CategoryEditForm/CategoryEditForm.vue';
import CategoryRemovePrompt from '../components/Category/CategoryRemovePrompt/CategoryRemovePrompt.vue';
import TaskCategoryList from '../components/Task/TaskCategoryList/TaskCategoryList.vue';
import TaskActiveList from '../components/Task/TaskActiveList/TaskActiveList.vue';
import TaskCompleteList from '../components/Task/TaskCompleteList/TaskCompleteList.vue';
import TaskAddForm from '../components/Task/TaskAddForm/TaskAddForm.vue';
import TaskEditForm from '../components/Task/TaskEditForm/TaskEditForm.vue';
import TaskRemovePrompt from '../components/Task/TaskRemovePrompt/TaskRemovePrompt.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MainPage
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
            path: '/task/category/:id',
            component: TaskCategoryList,
            props: true,
        },
        {
            path: '/task/active',
            component: TaskActiveList,
        },
        {
            path: '/task/complete',
            component: TaskCompleteList,
        },
        {
            path: '/task/add',
            component: TaskAddForm,
        },
        {
            path: '/task/edit/:id',
            component: TaskEditForm,
            props: true,
        },
        {
            path: '/task/remove/:id',
            component: TaskRemovePrompt,
            props: true,
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFound
        }
    ]
});

export default router;