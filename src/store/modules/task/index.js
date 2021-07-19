import axiosModule from '../../../axios/AxiosModule.js';

const state = {
    tasks : [],
    addTaskForm : {
        fields : {
            title : "",
            description : "",
            createdAt: "",
            isActive : false,
            isComplete: false,
            categoryId: 0
        },
    },
    editTaskForm : {
        fields : {
            title : "",
            description : "",
            createdAt: "",
            isActive : false,
            isComplete : false,
            categoryId : 0
        },
    },
};

const mutations = {
    UPDATE_TASKS(state, payload)
    {
        state.tasks = payload;
    },

    UPDATE_TASK_ADD_FORM_TITLE(state, payload)
    {
        state.addTaskForm.fields.title = payload;
    },
    UPDATE_TASK_ADD_FORM_DESCRIPTION(state, payload)
    {
        state.addTaskForm.fields.description = payload;
    },
    UPDATE_TASK_ADD_FORM_CREATEDAT(state, payload)
    {
        state.addTaskForm.fields.createdAt = payload;
    },
    UPDATE_TASK_ADD_FORM_ISACTIVE(state, payload)
    {
        state.addTaskForm.fields.isActive = payload;
    },
    UPDATE_TASK_ADD_FORM_ISCOMPLETE(state, payload)
    {
        state.addTaskForm.fields.isComplete = payload;
    },
    UPDATE_TASK_ADD_FORM_CATEGORYID(state, payload)
    {
        state.addTaskForm.fields.categoryId = payload;
    },

    UPDATE_TASK_EDIT_FORM_FIELDS(state, payload)
    {
        state.editTaskForm.fields = payload;
    },
    UPDATE_TASK_EDIT_FORM_TITLE(state, payload)
    {
        state.editTaskForm.fields.title = payload;
    },
    UPDATE_TASK_EDIT_FORM_DESCRIPTION(state, payload)
    {
        state.editTaskForm.fields.description = payload;
    },
    UPDATE_TASK_EDIT_FORM_CREATEDAT(state, payload)
    {
        state.editTaskForm.fields.createdAt = payload;
    },
    UPDATE_TASK_EDIT_FORM_ISACTIVE(state, payload)
    {
        state.editTaskForm.fields.isActive = payload;
    },
    UPDATE_TASK_EDIT_FORM_ISCOMPLETE(state, payload)
    {
        state.editTaskForm.fields.isComplete = payload;
    },
    UPDATE_TASK_EDIT_FORM_CATEGORYID(state, payload)
    {
        state.editTaskForm.fields.categoryId = payload;
    },

    UPDATE_CATEGORIES(state, payload)
    {
        state.categories = payload;
    },
}

const actions = {
    // load tasks for a given category
    loadCategoryTaskListAction({commit}, payload)
    {
        return new Promise((resolve, reject) => {
            axiosModule.task.get.getTasksByCategoryId(payload)
            .then((response) => {
                commit("UPDATE_TASKS", response.data.tasks);
                resolve(response);
            })
            .catch((error) => reject(error))
        });
    },

    // load active tasks
    loadActiveTaskListAction({commit}, payload)
    {
        return new Promise((resolve, reject) => {
            axiosModule.task.get.getActiveTasks(payload)
            .then((response) => {
                commit("UPDATE_TASKS", response.data.tasks);
                resolve(response);
            })
            .catch((error) => reject(error))
        });
    },

    // load complete tasks
    loadCompleteTaskListAction({commit}, payload)
    {
        return new Promise((resolve, reject) => {
            axiosModule.task.get.getCompleteTasks(payload)
            .then((response) => {
                commit("UPDATE_TASKS", response.data.tasks);
                resolve(response);
            })
            .catch((error) => reject(error))
        });
    },

    // add a task
    // eslint-disable-next-line no-unused-vars
    saveTaskAddForm({commit}, payload)
    {
        return new Promise((resolve, reject) => {
            axiosModule.task.post.addTask(payload)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });
    },

    // load task for an edit form
    loadTaskEditForm({commit}, payload)
    {
        return new Promise((resolve, reject) => {
            axiosModule.task.get.getTask(payload)
            .then((response) => {
                console.log(response);
                commit("UPDATE_TASK_EDIT_FORM_FIELDS", response.data.task);
                resolve(response);
            })
            .catch((error) => reject(error));
        });
    },

    // load task for an edit form
    clearTaskAddForm({commit})
    {
        var clear = {
            title : "",
            description : "",
            createdAt: "",
            isActive : false,
            isComplete: false,
            categoryId: 0
        }
        commit("UPDATE_TASK_EDIT_FORM_FIELDS", clear);
    },

    // edit a task
    // eslint-disable-next-line no-unused-vars
    saveTaskEditForm({commit}, payload)
    {
        return new Promise((resolve, reject) => {
            axiosModule.task.post.editTask(payload)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });
    },

    // eslint-disable-next-line no-unused-vars
    taskRemove({commit}, payload)
    {
        return new Promise((resolve, reject) => {
            axiosModule.task.post.removeTask(payload)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });
    }
}

const getters = {
    tasks: state => state.tasks,
    taskAddFormFields : state => state.addTaskForm.fields,
    taskEditFormFields : state => state.editTaskForm.fields,
}

const taskModule = {
    state,
    mutations,
    actions,
    getters,
};

export default taskModule;