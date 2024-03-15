import {configureStore} from "@reduxjs/toolkit";
import userReducer from "@/store/modules/user";

export default configureStore({
    reducer: {
        user: userReducer
    }
})