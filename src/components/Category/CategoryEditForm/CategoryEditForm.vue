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
                    <label>Color</label>
                    <input :value="fields.color" @input="OnColorInputChange" type="color">
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
            <div><router-link to="/category">Back to categories</router-link></div>
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
    name: "CategoryEditForm",
    props: ['id'],
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
            saveFormAction: "saveCategoryEditForm"
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
                            this.errors.idError = error.response.data.errors.Id[0];
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