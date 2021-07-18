import { createStore } from "vuex";
import categoryModule from "./modules/category";

export default createStore({
    modules: {
        categoryModule,
    }
});