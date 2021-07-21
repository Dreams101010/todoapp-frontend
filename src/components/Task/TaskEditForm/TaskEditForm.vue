<template>
    <div>
        <div class="mainForm" v-if="state === 'READY' || state === 'SAVING_ERROR' || state === 'SAVING'">
            <form>
                <div class="field">
                    <label>Title</label>
                    <input :value="fields.title" @input="OnTitleInputChange" type="text" placeholder="Enter title">
                    <p v-if="isTitleEmpty">Title cannot be empty</p>
                </div>
                <div class="field">
                    <label>Description</label>
                    <input :value="fields.description" @input="OnDescriptionInputChange" type="text" placeholder="Enter description">
                    <p v-if="isDescriptionEmpty">Description cannot be empty</p>
                </div>
                <div class="field">
                    <label>Category</label>
                    <select :value="fields.categoryId" @change="OnCategorySelectChange">
                        <option disabled value="">Please select one</option>
                        <option v-bind:key="category.id" v-for="category in categories" :value="category.id">{{category.title}}</option>
                    </select>
                </div>
                <div class="field">
                    <label>Active</label>
                    <input type="checkbox" :checked="fields.isActive" @change="OnActiveCheckboxChange">
                </div>
                <div class="field">
                    <label>Complete</label>
                    <input type="checkbox" :checked="fields.isComplete" @change="OnCompleteCheckboxChange">
                </div>
                <div class="button">
                    <button :disabled="!isFormValid || state == 'SAVING'" type="submit" @click="OnFormSubmit">Submit form</button>
                </div>
            </form>
        </div>
        <div>
            <p>
                {{errors.titleError}}
            </p>
            <p>
                {{errors.descriptionError}}
            </p>
            <p>
                {{errors.categoryError}}
            </p>
        </div>
        <div v-if="state === 'LOADING'">
            <p>
                Loading...
            </p>
        </div>
        <div class="formError" v-if="state === 'LOADING_ERROR'">
            <p>
                Error while trying to load form.
            </p>
            <button type="button" @click="LoadForm">Retry</button>
        </div>
        <div v-if="state === 'SAVE_SUCCESS'">
            <div>Save has been successful</div>
            <button @click="OnBackClick">Go back</button>
        </div>
        <div v-if="state === 'SAVING_ERROR'">
            <p>
                Error while saving (couldn't connect to server)
            </p>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    name: "task_edit_form",
    props: {
        id : {
            type : Number,
            required: true,
            validator : function(value)
            {
                return Number.isInteger(value) || value > 0;
            }
        }
    },
    data: function() {
        return {
            state : "READY",
            errors : {
                titleError : "",
                descriptionError: "",
                categoryError: "",
            },
        }
    },
    computed : {
        ...mapGetters({
            fields: "taskEditFormFields",
            categories : "categories",
        }),
        // set methods for conditional visiblity of field validation errors
        isTitleEmpty : function () 
        {
            return this.fields.title.length === 0;
        },
        isDescriptionEmpty : function ()
        {
            return this.fields.description.length === 0;
        },
        isCategorySelected : function()
        {
            return this.fields.category !== "";
        },
        isFormValid : function () 
        {
            return this.ValidateForm();    
        }
    },
    methods : {
        ...mapActions({
            loadFormAction: "loadTaskEditForm",
            saveFormAction: "saveTaskEditForm"
        }),
        ClearErrorFields()
        {
            this.errors.titleError = "";
        },
        OnTitleInputChange(evt)
        {
            this.$store.commit("UPDATE_TASK_EDIT_FORM_TITLE", evt.target.value);
        },
        OnDescriptionInputChange(evt)
        {
            this.$store.commit("UPDATE_TASK_EDIT_FORM_DESCRIPTION", evt.target.value);
        },
        OnCategorySelectChange(evt)
        {
            this.$store.commit("UPDATE_TASK_EDIT_FORM_CATEGORYID", Number(evt.target.value))
        },
        OnActiveCheckboxChange(evt)
        {
            this.$store.commit("UPDATE_TASK_EDIT_FORM_ISACTIVE", evt.target.checked)
        },
        OnCompleteCheckboxChange(evt)
        {
            this.$store.commit("UPDATE_TASK_EDIT_FORM_ISCOMPLETE", evt.target.checked)
        },
        OnBackClick()
        {
            this.$router.go(-1);
        },
        OnFormSubmit(evt)
        {
            this.state = "SAVING";
            this.ClearErrorFields();
            evt.preventDefault();
            if (!this.ValidateForm())
            {
                return;
            }
            let form = {
                id : this.id,
                title : this.fields.title,
                description: this.fields.description,
                createdAt: this.fields.createdAt,
                isActive: this.fields.isActive,
                isComplete: this.fields.isComplete,
                categoryId: this.fields.categoryId
            }
            this.saveFormAction(form)
                .then((response) => 
                {
                    console.log(response);
                    this.state = "SAVE_SUCCESS";
                })
                .catch((error) => {
                    // handle saving errors here: 404, 400, Timeout
                    console.log(error.response);
                    if (error.code === "ECONNABORTED")
                    {
                        this.state = "SAVING_ERROR";
                        console.log("Timeout");
                        return;
                    }
                    if (error.response.status === 400)
                    {
                        this.state = "READY";
                        if (error.response.data.errors.Title)
                        {
                            this.errors.titleError = error.response.data.errors.Id[0];
                        }
                        if (error.response.data.errors.Description)
                        {
                            this.errors.descriptionError = error.response.data.errors.Id[0];
                        }
                        if (error.response.data.errors.CategoryId)
                        {
                            this.errors.categoryError = error.response.data.errors.Id[0];
                        }
                    }
                    else if (error.response.status === 404)
                    {
                        this.state = "NOT_FOUND";
                        console.log("404");
                    }
                });
        },
        ValidateForm()
        {
            if (this.isTitleEmpty || this.isDescriptionEmpty|| !this.isCategorySelected)
            {
                return false;
            }
            else
            {
                return true;
            }
        },
        LoadForm()
        {
            this.state = "LOADING";
                this.loadFormAction(this.id).then(() => {
                this.state = "READY";
            })
            .catch((error) => {
                console.log(error);
                this.state = "LOADING_ERROR";
            });
        }
    },
    created()
    {
        this.LoadForm();
    }
}
</script>