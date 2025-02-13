import { createSlice } from "@reduxjs/toolkit";

interface User{
    firstName:string,
    lastName:string,
    email:string,
    image:string,
}
interface Props{
    currentuser:User | null,
    error:string |null,
    loading:boolean
}
const initialState:Props={
    //@ts-ignore
    currentuser:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading:false,
    error:null
}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signUpStart:(state)=>{
            state.loading=true
        },
        setUser:(state,action)=>{
            state.currentuser=action.payload;
            state.loading=false;
            state.error="";
        },
        signUpFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        signOut:(state)=>{
            state.currentuser=null;
            state.error="";
            state.loading=false;
        }

    }
})

export const {signUpStart,setUser,signUpFailure,signOut}=userSlice.actions;

export default userSlice.reducer