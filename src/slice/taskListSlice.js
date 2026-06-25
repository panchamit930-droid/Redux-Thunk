import { createAsyncThunk , createSlice} from "@reduxjs/toolkit";

const initialState={
    taskLists:[],
    is_loading:false,
    error:"",
}

export const getTasksFromServer = createAsyncThunk(
    "tasks/getTasksFromServer",
    async(_,{rejectWithValue})=>{
        const response=await fetch("http://localhost:3001/tasks")
        if (response.ok){
            const JsonResponse=await response.json()
            return JsonResponse
        }else{
            return rejectWithValue("No tasks found!")
            // return rejectWithValue({error:"No tasks found!"})
        }
    }
)

const taskListSlice = createSlice({
    name:"tasks",
    initialState,
    reducers : {},
    extraReducers:(builder)=>{
        builder
        // GET
        .addCase(getTasksFromServer.pending, (state)=>{
            state.is_loading=true
            state.error=""
        })
        .addCase(getTasksFromServer.fulfilled, (state, action)=>{
            state.is_loading=false
            state.taskLists = action.payload
        })
        .addCase(getTasksFromServer.rejected,(state,action)=>{
            state.is_loading = false
            state.error= action.payload
            state.taskLists=[]
        })
    }
})

export default taskListSlice.reducer