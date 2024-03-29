import { createSlice } from "@reduxjs/toolkit";
const cartSlice=createSlice({
    name:"cart",
    initialState:{
        flag:true,//flag to determine whose turn it is
        ///this you 9x9 matrix
        inceptionmat:
        [[0,0,0,0,0,0,0,0,0]
        ,[0,0,0,0,0,0,0,0,0]
        ,[0,0,0,0,0,0,0,0,0]
        ,[0,0,0,0,0,0,0,0,0]
        ,[0,0,0,0,0,0,0,0,0]
        ,[0,0,0,0,0,0,0,0,0]
        ,[0,0,0,0,0,0,0,0,0]
        ,[0,0,0,0,0,0,0,0,0]
        ,[0,0,0,0,0,0,0,0,0]],
        who_won_flag:["","","","","","","","",""],//flag to check how many grids X or O have won on a bigger scale
        index_of_small_xox:-1

    },
    reducers:{
        nexturn:(state)=>{
            state.flag=!state.flag;//changes the flag
        },
        markxoro:(state,action)=>{//this reducer function will atler the inceptionmat grids as 1 by x and 6 by o
            if(state.flag===true){
            state.inceptionmat[action.payload[0]][action.payload[1]]=1;}
            else{
                state.inceptionmat[action.payload[0]][action.payload[1]]=6;
            }
            console.log(action.payload);
            

        },
        mark_x_or_O_in_flag:(state,action)=>{//function will mark flag of player on who_won_flag
            state.who_won_flag[action.payload[0]]=action.payload[1];


        },
       set_xox_index:(state,action)=>{
        state.index_of_small_xox=action.payload;
       }
        

    }
    
})
export const{nexturn,markxoro,mark_x_or_O_in_flag,set_xox_index}=cartSlice.actions
export default cartSlice.reducer;
