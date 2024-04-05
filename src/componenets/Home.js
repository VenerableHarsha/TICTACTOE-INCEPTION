import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';
const Home = () => {
 const[rules,setrules]=useState(false);

  return (
    <div className='w-[100%] h-[150vh] bg-gradient-to-b from-slate-800 from-10% via-slate-900  to-black  absolute sm:h-[150vh] bg-gradient-to-tr from-slate-800 from-10% via-slate-900  to-black'>
      <div className='text-white font-bold text-3xl relative m-4 mx-16 mt-8 drop-shadow-lg'>Ince<span className='text-purple-700'>p</span>tion</div>
      <div className='flex flex-wrap'>
        <div>
      <div className='text-white font-bold text-7xl mx-16 mt-28 w-[500px] flex flex-wrap '>
        <Typewriter
          options={{
            strings: ['Fun, <span style="color:black;">Hair</span> pulling, <span style="color: purple ;">Smart ?</span>'],
            autoStart: true,
            loop: true,
            pauseFor: 300000
          }}
        />
      </div>
     
      <div className='flex mx-16 mt-16 gap-14'>
      <div className='p-4 py-2 bg-transparent text-white font-bold rounded-lg border-2 hover:text-green-500 '><Link to="/playgame">Start game</Link></div>
      <div className='p-4 py-2 bg-transparent rounded-lg border-2 text-white font-bold hover:text-red-500' onClick={()=>{
        setrules(!rules);
      }}>Rules</div>
      </div>
      
      </div>
      {!rules&&<img src='https://simo.sh/tic-tac-toe-draw.gif' className='w-[300px] h-[300px] mt-20 ml-52'></img>}
      {//<img src='https://simo.sh/tic-tac-toe-draw.gif' className='w-[300px] h-[300px] mt-20 ml-52'></img>
      rules&&
      <div className='flex flex-col gap-7 text-white w-[500px] mx-16 mt-12 font-bold text-2xl' >
        <h1 className='text-3xl'>Rules</h1>
       <p>1. Where ever you place your token will decide the corresponding location where opponent plays</p>
       <p>2. Tokens can be placed even if a given tik tac toe grid is won</p>
       <p>3. Win 3 small grids in a row to win the game</p>
       <p>4. Grid belongs to whoever wins it first </p>

        </div>
      }
      
      </div>
      </div>
      

  
  );
};

export default Home;
