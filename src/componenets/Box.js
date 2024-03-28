import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nexturn } from "./utilities/sliceofstore/cartSlice";
import { markxoro } from "./utilities/sliceofstore/cartSlice";
import { mark_x_or_O_in_flag } from "./utilities/sliceofstore/cartSlice";

const Box=(props)=>{
    
    const flag=useSelector((store)=>store.cart.flag);
  

    const dipatchforflag=useDispatch();
    const array=props.indexofbox;
    
   
   
    const dispatch=useDispatch();
   
    const [x_or_y,setxy]=useState("");
    const [color,setcolor]=useState("w-10 h-10  shadow-xl border-4  rounded-lg   m-2 cursor-pointer text-center font-bold text-3xl");
    
    return(
        <div className={color} onClick={()=>{
            if(flag){
                
                dispatch(markxoro(array));
                
               
            dispatch(nexturn());
            setxy("X");
            setcolor("w-10 h-10  shadow-xl border-4  rounded-lg   m-2 cursor-pointer text-center font-bold text-3xl text-yellow-400");
            
        }
            else{
              
                dispatch(markxoro(array));
                dispatch(nexturn());
            setxy("O");
            setcolor("w-10 h-10  shadow-xl border-4  rounded-lg   m-2 cursor-pointer text-center font-bold text-3xl text-purple-600")
           

            }

        }}>{x_or_y}</div>
    )
}
export default Box;