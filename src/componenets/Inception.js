import { Smallxox } from "./Smallxox"

export const Inception=()=>{
    const arr=[0,0,0,0,0,0,0,0,0];
    return(
        
        

        <div className="grid grid-cols-3 w-[700px] gap-y-5 ">
            {
                arr.map((obj,i)=>{
                    return(<Smallxox key={i} indexofsmall={i}/>)
                })
            }

        </div>
        
    )
}