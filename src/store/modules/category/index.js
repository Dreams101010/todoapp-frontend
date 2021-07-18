import axios from 'axios';

const state = {
    categories : [],
    addCategoryForm : {
        fields : {
            title: "",
            color: "#000000"
        }
    },
    editCategoryForm : {
        fields : {
            title: "",
            color: "#000000"
        }
    },
};

const mutations = {
    UPDATE_CATEGORIES(state, payload)
    {
        state.categories = payload;
    },
    UPDATE_CATEGORY_ADD_FORM_TITLE(state, payload)
    {
        state.addCategoryForm.fields.title = payload;
    },
    UPDATE_CATEGORY_ADD_FORM_COLOR(state, payload)
    {
        state.addCategoryForm.fields.color = payload;
    },
    UPDATE_CATEGORY_EDIT_FORM_FIELDS(state, payload)
    {
        state.editCategoryForm.fields = payload;
    },
    UPDATE_CATEGORY_EDIT_FORM_TITLE(state, payload)
    {
        state.editCategoryForm.fields.title = payload;
    },
    UPDATE_CATEGORY_EDIT_FORM_COLOR(state, payload)
    {
        state.editCategoryForm.fields.color = payload;
    }
}

const actions = {
    loadCategoryListAction({commit})
    {
        return new Promise((resolve, reject) => {
            axios.get("https://localhost:44374/api/Home/getCategories", { timeout : 1000 })
            .then((response) => {
                commit("UPDATE_CATEGORIES", response.data.categories);
                resolve(response);
            })
            .catch((error) => reject(error))
        });
    },

    // eslint-disable-next-line no-unused-vars
    saveCategoryAddForm({commit}, payload)
    {
        return new Promise((resolve, reject) => {
            axios.post("https://localhost:44374/api/Home/addCategory", payload, { timeout: 1000})
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });
    },

    loadCategoryEditForm({commit}, payload)
    {
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:44374/api/Home/getCategory?id=${payload}`, { timeout: 1000})
            .then((response) => {
                console.log(response.data.category);
                commit("UPDATE_CATEGORY_EDIT_FORM_FIELDS", response.data.category);
                resolve(response);
            })
            .catch((error) => reject(error));
        });
    },

    // eslint-disable-next-line no-unused-vars
    saveCategoryEditForm({commit}, payload)
    {
        return new Promise((resolve, reject) => {
            axios.post("https://localhost:44374/api/Home/editCategory", payload, { timeout: 1000})
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });
    },

    // eslint-disable-next-line no-unused-vars
    categoryRemove({commit}, payload)
    {
        return new Promise((resolve, reject) => {
            axios.post(`https://localhost:44374/api/Home/removeCategory?id=${payload}`, { timeout: 1000})
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });
    }
}

const getters = {
    categories: state => state.categories,
    categoryAddFormFields : state => state.addCategoryForm.fields,
    categoryEditFormFields : state => state.editCategoryForm.fields,
}

const categoryModule = {
    state,
    mutations,
    actions,
    getters,
};

export default categoryModule;