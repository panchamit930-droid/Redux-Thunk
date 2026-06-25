import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    taskLists:[],
    is_loading:false,
    error:"",
}