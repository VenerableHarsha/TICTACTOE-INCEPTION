import React, { useEffect } from "react";
import { Smallxox } from "./Smallxox";
import { useSelector } from "react-redux";

export const Inception = () => {
  useEffect(()=>{
    
  })
    
  const gameOver = useSelector((store) => store.cart.Game_over);

  // Function to render the game over screen
  const renderGameOverScreen = () => {
    if (gameOver === 1) {
      return <div className="text-3xl text-center">Player X wins!</div>;
    } else if (gameOver === 6) {
      return <div className="text-3xl text-center">Player O wins!</div>;
    } else if (gameOver === 2) {
      return <div className="text-3xl text-center">It's a draw!</div>;
    }
    // Return null if game is not over
    return null;
  };

  return (
    <div className="bg-inherit">
      {gameOver !== 0 && renderGameOverScreen()} {/* Render game over screen when game is over */}
      {gameOver === 0 && (
        <>
          <div className="text-center text-3xl mt-6 text-white brightness-200 font-bold">Let's play</div>
          <div className="flex justify-center items-center">
            <div className="text-6xl font-bold text-yellow-400">X</div>
            <div className="grid grid-cols-3 w-[700px] gap-x-4 gap-y-8 scale-[0.8]">
              {[0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => (
                <Smallxox key={i} indexofsmall={i} />
              ))}
            </div>
            <div className="text-6xl font-bold text-purple-700">O</div>
          </div>
        </>
      )}
    </div>
  );
};
