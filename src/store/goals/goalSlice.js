import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getUserGoals, createUserGoal, deleteUserGoal, updateUserGoal } from './api'

const initialState = {
   goals:[],
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: ''
}
export const getGoals = createAsyncThunk('goals/getAllGoals', async (_,thunkAPI) => {
   try {
      const token = thunkAPI.getState().auth.user.token
      return await getUserGoals(token)
   } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
   }
})

export const createGoal = createAsyncThunk('goals/createGoal', async (goalData, thunkAPI) => {
   try {
      const token = thunkAPI.getState().auth.user.token
      return await createUserGoal(goalData, token)
   } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
   }
} )
export const deleteGoal = createAsyncThunk('goals/deleteGoal', async (goalId, thunkAPI) => {
   try {
      const token = thunkAPI.getState().auth.user.token
      return await deleteUserGoal(goalId, token)
   } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
   }
} )
export const updateGoal = createAsyncThunk('goals/updateGoal', async (goal, thunkAPI) => {
   try {
      const token = thunkAPI.getState().auth.user.token
      const data = await updateUserGoal(goal, token)
      return data
   } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
   }
} )

const goalSlice = createSlice({
   name: 'goals',
   initialState,
   reducers: {
      reset: (state)=>initialState
   },
   extraReducers: (builder) => {
      builder
         .addCase(getGoals.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getGoals.fulfilled, (state, action) => {
            state.goals = action.payload
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.message=''
         })
         .addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.goals = []
         })
         .addCase(createGoal.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createGoal.fulfilled, (state, action) => {
            state.goals.push(action.payload)
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.message=''
         })
         .addCase(createGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess= false
            state.message = action.payload
         })
         .addCase(deleteGoal.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteGoal.fulfilled, (state, action) => {
            const id = action.payload.id
            state.goals= state.goals.filter(goal=>goal._id !==id)
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.message=''
         })
         .addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess= false
            state.message = action.payload
         })
         .addCase(updateGoal.pending, (state) => {
            state.isLoading = true
         })
      
      
         .addCase(updateGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.goals = state.goals.map(goal => {
               if (goal._id === action.payload._id) {
                
                  return action.payload
               } else {
                  return goal
               }
            })
         })
         .addCase(updateGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess= false
            state.message = action.payload
         })
   }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer
