import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nexturn } from "./utilities/sliceofstore/cartSlice";
import { markxoro } from "./utilities/sliceofstore/cartSlice";
import { mark_x_or_O_in_flag } from "./utilities/sliceofstore/cartSlice";
import { set_xox_index } from "./utilities/sliceofstore/cartSlice";
const Box=(props)=>{
    
    const flag=useSelector((store)=>store.cart.flag);
    const currentindex=useSelector((store)=>store.cart.index_of_small_xox);
    
  

    const dipatch=useDispatch();
    const array=props.indexofbox;
    
   
   
    const dispatch=useDispatch();
   
    const [x_or_y,setxy]=useState("");
    const [color,setcolor]=useState("w-10 h-10  shadow-xl border-4  rounded-lg   m-2 cursor-pointer text-center font-bold text-3xl");
    
    return(
        <div className={color} onClick={()=>{
            if(props.indexofbox[0]===currentindex){
            
            if(flag){//if true its x 's turn if false o 's turn
                
                dispatch(markxoro(array));//calling markxoxo check the matrix by logging if u want
                
               
            dispatch(nexturn());//dispatches the function to chnage tune turn if true its x 's turn if false o 's turn
            setxy("X");
            setcolor("w-10 h-10  shadow-xl border-4  rounded-lg   m-2 cursor-pointer text-center font-bold text-3xl text-yellow-400");
            dispatch(set_xox_index(props.indexofbox[1]));
            }
        
            else{
                
                dispatch(markxoro(array));//viceverda
                dispatch(nexturn());
            setxy("O");
            setcolor("w-10 h-10  shadow-xl border-4  rounded-lg   m-2 cursor-pointer text-center font-bold text-3xl text-purple-600")
            dispatch(set_xox_index(props.indexofbox[1]));

            }}
            else{
                alert("wrong grid put your move on the highted grid")
            }

        }}>{x_or_y}</div>
    )
}
export default Box;