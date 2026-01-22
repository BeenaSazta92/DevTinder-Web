import { createSlice } from "@reduxjs/toolkit";
const requestSlice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        addRequests: (state,action)=>action.payload,
        removeRequests: (state,action)=>{
           if(!state) return null
            const newArray = state.filter(r=>r._id != action.payload)
            return newArray
        }
    }

})

export const {addRequests, removeRequests} = requestSlice.actions
export default requestSlice.reducer