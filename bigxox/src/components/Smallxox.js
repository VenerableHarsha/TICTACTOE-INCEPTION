 import { useState } from "react"
import { Box } from "./Box"
 
 export const Smallxox=()=>{

    const[arrayof1,setarrayof1]=useState([0,0,0,0,0,0,0,0,0]);
    const[arrayof2,setarrayof2]=useState([0,0,0,0,0,0,0,0,0]);
    function check(arr){
        console.log("i have been claaed");
        const newarray=[...arr];
        const temp=[[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]];
        for(let i in temp)
        {
            console.log();
            if(newarray[temp[i][0]]+newarray[temp[i][1]]+newarray[temp[i][2]]===3)
            {
                return true;
            }

        }
        return false;
    }
    
    const putxforarray1=(index)=>{
        const newarray=[...arrayof1];
        newarray[index]=1;
        setarrayof1(newarray);
    }
    const putoforarray2=(index)=>{
        const newarray=[...arrayof2];
        newarray[index]=1;
        setarrayof2(newarray);
    }
    console.log(arrayof1);
    console.log(arrayof2);
    const arr=[0,1,2]
    if(check(arrayof1))
    {
        return(<div className="w-[288px] h-[288px] font-bold text-green-600 text-9xl flex justify-center items-center">X</div>)
    }
    if(check(arrayof2))
    {
        return(<div className="w-[288px] h-[288px] font-bold text-red-600 text-9xl flex justify-center items-center">O</div>)
    }
    return(
        
        
        <div className="flex-col gap-y-7 p-4">
            <div className=" flex gap-2 ">
               {
                arr.map((item,i)=>{
                    return(<Box key={i} passthis={()=>{putxforarray1(i)}}  pathisfoy={()=>{
                        putoforarray2(i)
                    }}/>)
                })
                
               }


            </div> 
            <div className="flex gap-2 mt-2">
            {
                arr.map((item,i)=>{
                    return(<Box key={i+3} passthis={()=>{putxforarray1(i+3)}} pathisfoy={()=>{
                        putoforarray2(i+3)
                    }}/>)
                })
                
               }
            
            </div>
            <div className="flex gap-2 cursor-pointer mt-2">
            {
                arr.map((item,i)=>{
                    return(<Box key={i+6} passthis={()=>{putxforarray1(i+6)}} pathisfoy={()=>{
                        putoforarray2(i+6)
                    }}/>)
                })
                
               }
            </div>
        </div>

    )
}