import { createSlice } from "@reduxjs/toolkit";

const intialState={
    isAuthenticated:false,
    isLoading:false,
    user:null
}

const authSlice=createSlice({
    name:"auth",
    intialState,
    reducers:{
        setUser:(state,action)=>{

        }
    }
})
 
export const {setUser}=authSlice.actions;
export default authSlice.reducer;