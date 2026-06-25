import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "../slice/taskListSlice"

export const store = configureStore({
    reducer : {
        tasks : taskListReducer,
    }
})