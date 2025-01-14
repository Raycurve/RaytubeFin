
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  loading: false,
  error:false
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginStart: (state)=>{
            state.loading = true;
        },
        loginSuccess: (state,action)=>{
            state.loading = false;
            state.currentUser = action.payload
        },
        loginFailure: (state)=>{
            state.loading = false;
            state.error = true;
        },
        logout:(state)=>{
            state.loading = false;
            state.error = false;
            state.currentUser = null;
        },
        subscription:(state,action)=>{
            if(state.currentUser.subscriberChannels?.includes(action.payload)){
                state.currentUser.subscriberChannels.splice(
                    state.currentUser.subscriberChannels.findIndex(
                        (channelId)=>channelId===action.payload
                    ),1
                );
            }
            else{
                state.currentUser.subscriberChannels.push(action.payload);
            }
        }

    }
})

export const {loginStart, loginSuccess, loginFailure, logout , subscription} = userSlice.actions;

export default userSlice.reducer;