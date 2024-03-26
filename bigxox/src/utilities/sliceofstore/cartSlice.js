import { createSlice} from "@reduxjs/toolkit";
const cartSlice=createSlice({
    name:"cart",
    initialState:{
        flag:true,
    },
    reducers:{
        nexturn:(state)=>{
            state.flag=!state.flag;
            
        }
        
    }
})
export const{nexturn}=cartSlice.actions;

export default cartSlice.reducer;