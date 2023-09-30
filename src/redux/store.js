import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";

const store = configureStore({
    
    reducer: {
        

        authState: authReducer,
        categoryState: categoryReducer,
    }
})

export default store