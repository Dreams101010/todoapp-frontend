<template>
    <div>
        <div class="formHeader">
            <div class="is-size-4">Edit a category</div>
        </div>
        <div class="mainForm" v-if="state === 'READY' || state === 'SAVING_ERROR' || state === 'SAVING'">
            <form>
                <div class="field">
                    <label><b>Title</b></label>
                    <div class="control">
                        <input :value="fields.title" class="input is-primary" @input="OnTitleInputChange" type="text" placeholder="Enter title">
                    </div>
                    <div class="validation-error" v-if="isTitleEmpty">Title cannot be empty</div>
                </div>
                <div class="field">
                    <div>
                        <label><b>Color</b></label>
                        </div>
                    <div>
                        <input :value="fields.color" class="input is-primary" @input="OnColorInputChange" type="color">
                    </div>
                </div>
                <div>
                    <button class="button is-primary" :disabled="!isFormValid || state == 'SAVING'" type="submit" @click="OnFormSubmit">Edit a category</button>
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
            <div>Category has been edited</div>
            <div><router-link to="/category">Back to categories</router-link></div>
        </div>
        <div v-if="state === 'SAVING_ERROR'">
            <p>
                Could not edit category (couldn't connect to server)
            </p>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    name: "category-edit-form",
    props: {
        id : {
            type : String,
            required: true,
            validator : function(value)
            {
                var number = Number(value);
                return Number.isInteger(number) || number > 0;
            }
        }
    },
    data: function() {
        return {
            state : "INITIAL",
            errors : {
                titleError : ""
            }
        }
    },
    computed : {
        ...mapGetters({
            fields: "categoryEditFormFields",
        }),
        // set methods for conditional visiblity of field validation errors
        isTitleEmpty : function () 
        {
            return this.fields.title.length === 0;
        },
        isFormValid : function () 
        {
            return this.ValidateForm();    
        }
    },
    methods : {
        ...mapActions({
            loadFormAction: "loadCategoryEditForm",
            saveFormAction: "saveCategoryEditForm",
            loadCategoryListAction : "loadCategoryListAction"
        }),
        ClearErrorFields()
        {
            this.errors.titleError = "";
        },
        OnTitleInputChange(evt)
        {
            this.$store.commit("UPDATE_CATEGORY_EDIT_FORM_TITLE", evt.target.value);
        },
        OnColorInputChange(evt)
        {
            this.$store.commit("UPDATE_CATEGORY_EDIT_FORM_COLOR", evt.target.value);
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
                color : this.fields.color,
            }
            this.saveFormAction(form)
                .then((response) => 
                {
                    console.log(response);
                    this.state = "SAVE_SUCCESS";
                    this.loadCategoryListAction()
                        .then(() => 
                        {
                            console.log("loaded categories")
                        })
                        .catch(() => {
                            this.state = "LOADING_ERROR";
                            // handle saving errors here: 404, 400, Timeout
                        });
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
                            this.errors.titleError = error.response.data.errors.Title[0];
                        }
                    }
                    if (error.response.status === 500)
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
            if (this.isTitleEmpty)
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

<style>
    .mainForm
    {
        text-align: left;
    }

    .validation-error
    {
        color: red;
    }
</style>