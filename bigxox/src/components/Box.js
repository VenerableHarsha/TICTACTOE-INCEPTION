//this component represents the box of the small tic taktoe
import { useState } from "react"
import { useDispatch } from "react-redux";
import { nexturn } from "../utilities/sliceofstore/cartSlice";
import { useSelector } from "react-redux";
export const Box=(props)=>{
    //state variable that chnages when the flag changes ie:for x the state varibale will change to yellow and vice versa o fo0r purple
    const [color,setcolor]=useState("w-12 h-12 rounded-2xl shadow-lg border cursor-pointer flex justify-center items-center text-4xl font-bold text-yellow-400");
    const flagger=useSelector((store)=>store.cart.flag);//the falgger variable is subscribed to the store .cart.flag variable present in the sliceofstaore
    //since componenet work independently we might have to pass the flag varibale as prop to all the 9 Smallxox components to avoid that
    //we use redux that acts as a common store for all smallxox componenet
    console.log(flagger);
   
    const[valueofbox,setvalueofbox]=useState("");//X OR O
    const dispatch=useDispatch();
    return(
        <div className={color}  onClick={()=>{
           {
            if(flagger){//if flage is true it is x turn
                setcolor("w-12 h-12 rounded-2xl shadow-lg border cursor-pointer flex justify-center items-center text-4xl font-bold text-yellow-400")
            setvalueofbox("X");
            props.passthis();
        }
            else{
                //if flag is false it is o turn
                setcolor("w-12 h-12 rounded-2xl shadow-lg border cursor-pointer flex justify-center items-center text-4xl font-bold text-purple-700")
                setvalueofbox("O");
                props.pathisfoy();
            }
            dispatch(nexturn());}
        }}>{valueofbox}</div>
    )
}