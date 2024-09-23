import { createSlice } from "@reduxjs/toolkit";
const iswin = (grid, state) => {
    const wins = [
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // rows
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const win of wins) {
        const [a, b, c] = win;
        if (grid[a] !== "" && grid[a] === grid[b] && grid[a] === grid[c]) {
            state.Game_over = grid[a] === "X" ? 1 : 6; // Set Game_over to 1 for X, 6 for O
            return;
        }
    }

    // If no winner, check for draw
    if (!grid.includes("")) {
        state.Game_over = 2; // Set Game_over to 2 for a draw
        return;
    }

    // If no winner or draw, Game_over remains 0
};
const cartSlice=createSlice({
    name:"cart",
    initialState:{
        Game_over:0,//flag to see if gameover 0 - nope ,1- x , 6 - O , 2 - Draw
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
        index_of_small_xox:4

    },
    reducers:{
        nexturn:(state)=>{
            state.flag=!state.flag;//changes the flag
        },
        markxoro:(state,action)=>{//this reducer function will atler the inceptionmat grids as 1 by x and 6 by o
            const [row, col] = action.payload;
            const cellValue = state.inceptionmat[row][col];
            if(cellValue===0){
            if(state.flag===true ){
            state.inceptionmat[action.payload[0]][action.payload[1]]=1;}
            else{
                state.inceptionmat[action.payload[0]][action.payload[1]]=6;
            }}
            

        },
        resetgrid:(state,action)=>{
            for(let i=0;i<9;i++)
            {
                state.inceptionmat[action.payload][i]=0;
            }

        },
        mark_x_or_O_in_flag:(state,action)=>{//function will mark flag of player on who_won_flag
            
            state.who_won_flag[action.payload[0]]=action.payload[1];
            console.log(state.who_won_flag[action.payload[0]]);
            iswin(state.who_won_flag,state);
            

        },
       set_xox_index:(state,action)=>{
        state.index_of_small_xox=action.payload;
       }
        

    }
    
})
export const{nexturn,markxoro,mark_x_or_O_in_flag,set_xox_index,resetgrid}=cartSlice.actions
export default cartSlice.reducer;
