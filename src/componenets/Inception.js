import React, { useEffect, useState } from "react";
import { Smallxox } from "./Smallxox";
import { useSelector } from "react-redux";

export const Inception = () => {
  const [count,setcount]=useState(1);
  const[set,setfalse]=useState(true)
useEffect(()=>{
  const interval=setInterval(()=>{
    if(count<3){
      setcount(count+1);
    }
    else{
      setfalse(false);
      clearInterval(interval);
      
    }
  },1000);
  
},[count])
  
  //const [count,setcount]=useState(1);
  const gameOver = useSelector((store) => store.cart.Game_over);
  const flag=useSelector((store)=>store.cart.flag);
  // Function to render the game over screen
  const renderGameOverScreen = () => {
    if (gameOver === 1) {
      return <div className="text-6xl text-center h-[100vh] flex justify-center items-center " style={{ color:"yellow" ,textShadow: '0 0 50px yellow' }}>Player X wins!</div>;
    } else if (gameOver === 6) {
      return <div className="text-6xl text-center h-[100vh] flex justify-center items-center " style={{ color:"purple" ,textShadow: '0 0 50px purple' }}>Player O wins!</div>;
    } else if (gameOver === 2) {
      return <div className="text-6xl text-center h-[100vh] flex justify-center items-center " style={{ color:"white" ,textShadow: '0 0 50px white' }}>It's a draw!</div>;
    }
    // Return null if game is not over
    return null;
  };
  

  return (
    <div className="w-screen bg-inherit">
     { set&&<h1 className=" z-50 absolute flex justify-center left-[50%] top-[55%] text-white text-3xl ">{count}</h1>}
      {gameOver !== 0 && renderGameOverScreen()} {/* Render game over screen when game is over */}
      {gameOver === 0 && (
        <>
          <div className="text-center text-3xl mt-3 text-white brightness-200 font-bold">Let's play<div className="text-sm mt-3" style={{ color:flag?"yellow":"purple",textShadow: flag?"0 0 50px yellow":"0 0 50px purple" }}>{flag?"Player X":"Player O"}</div></div>
          <div className="flex justify-center items-center">
            <div className="text-6xl font-bold text-yellow-400" style={{ color:"yellow" ,textShadow: '0 0 50px yellow' }}>X</div>
            <div className="grid grid-cols-3 w-[700px] gap-x-4 gap-y-8 scale-[0.8]">
              {[0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => (
                <Smallxox key={i} indexofsmall={i} />
              ))}
            </div>
            <div className="text-6xl font-bold text-purple-700" style={{ color:"purple" ,textShadow: '0 0 50px purple' }}>O</div>
          </div>
        </>
      )}
    </div>
  );
};
