import { useState } from "react"
import { useDispatch } from "react-redux";
import { nexturn } from "../utilities/sliceofstore/cartSlice";
import { useSelector } from "react-redux";
export const Box=()=>{
    const flagger=useSelector((store)=>store.cart.flag);
    console.log(flagger);
   
    const[valueofbox,setvalueofbox]=useState("");
    const dispatch=useDispatch();
    return(
        <div className="w-20 h-20 rounded-2xl shadow-lg border cursor-pointer flex justify-center
        items-center text-4xl font-bold text-purple-700"  onClick={()=>{
           {
            setvalueofbox(flagger===true?"X":"O");
            
            dispatch(nexturn());}
        }}>{valueofbox}</div>
    )
}