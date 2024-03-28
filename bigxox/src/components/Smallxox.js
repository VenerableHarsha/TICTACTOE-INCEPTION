 import { useState } from "react"
import { Box } from "./Box"
 
 export const Smallxox=()=>{
    //WRITING LOGIC FOR WHO WINS IN THE SMALL XOX

    const[arrayof1,setarrayof1]=useState([0,0,0,0,0,0,0,0,0]);
    const[arrayof2,setarrayof2]=useState([0,0,0,0,0,0,0,0,0]);
    const [border,setborder]=useState("flex-col gap-y-7 p-4");
    
    function check(arr){//logic to check if x or O wins in the component
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
    //putxforarray1 is function that lets us know which box x has marked
    const putxforarray1=(index)=>{
        const newarray=[...arrayof1];
        newarray[index]=1;
        setarrayof1(newarray);
    }
    //putxforarray1 is function that lets us know which box x has marked
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
        
        
        <div className={border}>
            <div className="flex gap-2 w-[170px] justify-between">
               {
                arr.map((item,i)=>{
                    //we are passing putxforaary1 as prop so that the child box calls it when it is pressed
                    return(<Box key={i} passthis={()=>{putxforarray1(i)}}  pathisfoy={()=>{
                        putoforarray2(i)
                    }}/>)
                })
                
               }


            </div> 
            <div className="flex gap-2 mt-2 w-[170px] justify-between">
            {
                arr.map((item,i)=>{
                    //we are passing putxforaary2 as prop so that the child box calls it when it is pressed
                    return(<Box key={i+3} passthis={()=>{putxforarray1(i+3)}} pathisfoy={()=>{
                        putoforarray2(i+3)
                    }}/>)
                })
                
               }
            
            </div>
            <div className="flex gap-2 cursor-pointer mt-2 w-[170px] justify-between">
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

export const bordercompo=(Smallxox)=>{
    return()=>{
        return(
            <dib></dib>
        )
    }
}