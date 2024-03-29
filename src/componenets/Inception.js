import { useState } from "react";
import { Smallxox } from "./Smallxox"
import { useSelector } from "react-redux";

export const Inception=()=>{
    const flag=useSelector(store=>store.cart.flag);
    const arr=[0,0,0,0,0,0,0,0,0];
    const borderyellow="w-15 h-18  p-6 border-4 border-yellow-300 rounded-xl";
    const textfont="text-6xl font-bold  ";

    

    
    return(
        
        <div >
            <div className=" text-center text-3xl">Let's play</div>
            <div className="flex justify-center items-center">
          <div className={textfont+(flag&&borderyellow)}>X</div>
        <div className="grid grid-cols-3 w-[700px] gap-x-4 gap-y-4 scale-[0.8]">
            {
                arr.map((obj,i)=>{
                   
                    return(
                    <Smallxox key={i} indexofsmall={i}/>)
                })
            }

        </div>
        <div className={textfont+(!flag&&borderyellow)}>O</div>
        </div>
        </div>
        
    )
}