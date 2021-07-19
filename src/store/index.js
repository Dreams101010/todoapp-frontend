import { createStore } from "vuex";
import categoryModule from "./modules/category";
import taskModule from "./modules/task";

export default createStore({
    modules: {
        categoryModule,
        taskModule
    }
});