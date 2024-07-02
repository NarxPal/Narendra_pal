import { configureStore } from "@reduxjs/toolkit";
import tokenSliceReducer from "./token"


export const store = configureStore({
    reducer:{
        token: tokenSliceReducer,
    }
})


export default store