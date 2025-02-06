import React, { useEffect, useState } from "react";
import { Smallxox } from "./Smallxox";
import { useSelector } from "react-redux";

export const Inception = () => {
  const [count,setcount]=useState(1);
  const[set,setfalse]=useState(true)
 

  
  //const [count,setcount]=useState(1);
  const gameOver = useSelector((store) => store.cart.Game_over);
  const flag=useSelector((store)=>store.cart.flag);
  // Function to render the game over screen
  const renderGameOverScreen = () => {
    if (gameOver === 1 || gameOver === 6 || gameOver === 2) {
      return (
        <div className="text-6xl text-center h-[100vh] flex flex-col justify-center items-center">
          <div
            style={{
              color: gameOver === 1 ? "yellow" : gameOver === 6 ? "purple" : "white",
              textShadow: `0 0 50px ${gameOver === 1 ? "yellow" : gameOver === 6 ? "purple" : "white"}`,
            }}
          >
            {gameOver === 1 ? "Player X wins!" : gameOver === 6 ? "Player O wins!" : "It's a draw!"}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 text-2xl bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Play Again
          </button>
        </div>
      );
    }
    return null;
  };
  
  

  return (
    <div className="w-screen bg-inherit h-[100vh]">
    {/* {set && (
      <h1 className="z-50 absolute flex justify-center left-[50%] top-[55%] text-white text-3xl">
        {count}
      </h1>
    )} */}
    {gameOver !== 0 && renderGameOverScreen()} {/* Render game over screen when game is over */}
    {gameOver === 0 && (
      <>
        <div className="text-center text-xl sm:text-3xl mt-3   text-white brightness-200 font-bold ">
          Let's play
          <div
            className="text-sm mt-3"
            style={{
              color: flag ? "yellow" : "purple",
              textShadow: flag ? "0 0 50px yellow" : "0 0 50px purple",
            }}
          >
            {flag ? "Player X" : "Player O"}
          </div>
        </div>
        <div className="flex justify-center items-center ">
          {/* X Element - Visible only on sm screens and larger */}
          <div
            className="hidden sm:block text-6xl font-bold text-yellow-400"
            style={{ color: "yellow", textShadow: "0 0 50px yellow" }}
          >
            X
          </div>
          <div className="grid grid-cols-3 w-[700px] gap-x-4 gap-y-8 md:scale-[0.8] scale-[0.7]">
            {[0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => (
              <Smallxox key={i} indexofsmall={i} />
            ))}
          </div>
          {/* O Element - Visible only on sm screens and larger */}
          <div
            className="hidden sm:block text-6xl font-bold text-purple-700"
            style={{ color: "purple", textShadow: "0 0 50px purple" }}
          >
            O
          </div>
        </div>
      </>
    )}
  </div>
  
  );
};
