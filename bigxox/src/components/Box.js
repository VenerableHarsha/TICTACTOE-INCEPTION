import { useState } from "react"
import { useDispatch } from "react-redux";
import { nexturn } from "../utilities/sliceofstore/cartSlice";
import { useSelector } from "react-redux";
export const Box=(props)=>{
    const [color,setcolor]=useState("w-20 h-20 rounded-2xl shadow-lg border cursor-pointer flex justify-center items-center text-4xl font-bold text-yellow-400");
    const flagger=useSelector((store)=>store.cart.flag);
    console.log(flagger);
   
    const[valueofbox,setvalueofbox]=useState("");
    const dispatch=useDispatch();
    return(
        <div className={color}  onClick={()=>{
           {
            if(flagger){
                setcolor("w-20 h-20 rounded-2xl shadow-lg border cursor-pointer flex justify-center items-center text-4xl font-bold text-yellow-400")
            setvalueofbox("X");
            props.passthis();
        }
            else{
                
                setcolor("w-20 h-20 rounded-2xl shadow-lg border cursor-pointer flex justify-center items-center text-4xl font-bold text-purple-700")
                setvalueofbox("O");
                props.pathisfoy();
            }
            dispatch(nexturn());}
        }}>{valueofbox}</div>
    )
}