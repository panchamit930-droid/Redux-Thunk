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

export const addTaskToServer = createAsyncThunk(
    "task/addTaskToServer",
    async(newTask , {rejectWithValue})=>{
        const response= await fetch("http://localhost:3001/tasks", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(newTask)
        })
        if(!response.ok){
            return rejectWithValue("failed to add task")
        }
        const data= response.json()
        return data
    }
)

export const deleteTaskFromServer = createAsyncThunk(
    "task/deletTasksFromServer",
    async(id, {rejectWithValue})=>{
        const response = await fetch(`http://localhost:3001/tasks/${id}` , {
            method : "DELETE",
        })

        if(!response.ok){
            return rejectWithValue("failed to delete task")
        }

        return id
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
        // POST
        .addCase(addTaskToServer.pending, (state)=>{
            state.is_loading=true
            state.error=""
            state.taskLists=[]
        })
        .addCase(addTaskToServer.fulfilled,(state , action)=>{
            state.is_loading=false
            state.taskLists.push(action.payload)
        })
        .addCase(addTaskToServer.rejected, (state,action)=>{
            state.is_loading=false
            state.error=action.payload
            
        })

        // DELETE
        .addCase(deleteTaskFromServer.pending, (state)=>{
            state.is_loading=true
            state.error=""
        })
        .addCase(deleteTaskFromServer.fulfilled, (state , action)=>{
            state.is_loading=false
            state.taskLists=state.taskLists.filter((item)=> item.id !== action.payload)
        })
        .addCase(deleteTaskFromServer.rejected , (state , action)=>{
            state.is_loading=false
            state.error=action.payload
        })
    }
})

export default taskListSlice.reducer