<template>
    <div>
        <div v-if="state === 'READY' || state === 'SAVING_ERROR' || state === 'SAVING'">
            <div class="formHeader">
                <div class="is-size-4">Edit a task</div>
            </div>
            <div class="mainForm">
                <form>
                    <div class="field">
                        <label><b>Title</b></label>
                        <div class="control">
                            <input :value="this.fields.title" class="input is-primary" @input="OnTitleInputChange" type="text" placeholder="Enter title">
                        </div>
                        <div class="validation-error" v-if="isTitleEmpty">Title cannot be empty</div>
                    </div>
                    <div class="field">
                        <label><b>Description</b></label>
                        <div class="control">
                            <textarea 
                                :value="this.fields.description" 
                                class="input is-primary" 
                                @input="OnDescriptionTextareaChange" 
                                placeholder="Enter description">
                            </textarea>
                        </div>
                        <div class="validation-error" v-if="isDescriptionEmpty">Description cannot be empty</div>
                    </div>
                    <div class="field">
                        <label><b>Category</b></label>
                        <div class="control">
                            <select :value="this.fields.categoryId" class="select" @change="OnCategorySelectChange">
                                <option disabled selected value="0">Please select one</option>
                                <option v-bind:key="category.id" v-for="category in categories" :value="category.id">{{category.title}}</option>
                            </select>
                        </div>
                        <div class="validation-error" v-if="!isCategorySelected">You must select a category</div>
                    </div>
                    <div class="field">
                        <label><b>Active</b></label>
                        <div class="control checkbox-div">
                            <input :checked="this.fields.isActive" class="checkbox" type="checkbox" @change="OnActiveCheckboxChange">
                        </div>
                    </div>
                    <div class="field">
                        <label><b>Complete</b></label>
                        <div class="control checkbox-div">
                            <input :checked="this.fields.isComplete" class="checkbox" type="checkbox" @change="OnCompleteCheckboxChange">
                        </div>
                    </div>
                    <div>
                        <button class="button is-primary" :disabled="!isFormValid || state == 'SAVING'" type="submit" @click="OnFormSubmit">Submit form</button>
                    </div>
                </form>
            </div>
            <div>
                <div class="validation-error">
                    {{errors.errorMessage}}
                </div>
                <div class="validation-error">
                    {{errors.titleError}}
                </div>
                <div class="validation-error">
                    {{errors.descriptionError}}
                </div>
                <div class="validation-error">
                    {{errors.categoryError}}
                </div>
            </div>
        </div>
        <div v-if="state === 'SAVE_SUCCESS'">
            <div>
                Task has been edited
            </div>
            <div>
                <button class="button is-primary" @click="OnBackClick">Go back</button>
            </div>
        </div>
        <div v-if="state === 'SAVING_ERROR'">
            <div>
                Couldn't edit task (couldn't connect to server)
            </div>
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
                errorMessage: "",
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
        OnDescriptionTextareaChange(evt)
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
                    else if (error.response.status === 500)
                    {
                        this.state = "READY";
                        if (error.response.data.message)
                        {
                            this.errors.errorMessage = error.response.data.message;
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