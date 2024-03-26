 import { Box } from "./Box"
 export const Smallxox=()=>{
    const arr=[0,1,2]
    return(
        <div className="flex-col gap-y-7 p-4">
            <div className=" flex gap-2 ">
               {
                arr.map((item,i)=>{
                    return(<Box key={i} />)
                })
                
               }


            </div> 
            <div className="flex gap-2 mt-2">
            {
                arr.map((item,i)=>{
                    return(<Box key={i+3}/>)
                })
                
               }
            
            </div>
            <div className="flex gap-2 cursor-pointer mt-2">
            {
                arr.map((item,i)=>{
                    return(<Box key={i+6}/>)
                })
                
               }
            </div>
        </div>

    )
}