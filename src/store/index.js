import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import itemsSlice from "./itemsSlice";
import passwordsSlice from "./passwordsSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        items: itemsSlice,
        passwords: passwordsSlice
    }
})