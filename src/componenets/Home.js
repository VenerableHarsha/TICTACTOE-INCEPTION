import React from 'react';


const Home = () => {
 

  return (
    <div className='p-8'>
    <div className='font-bold text-5xl m-5 ml-8'>Ince<span className="text-cyan-300 font-bold">p</span>tion</div>
    <div className='flex flex-col md:flex-row justify-between'>
      <div className='flex-col mt-20 ml-9'>
        <div className='font-bold text-7xl '><span className='text-purple-900'>F</span>un,H<span className='text-yellow-400'>a</span>ir-</div>
        <div className='font-bold text-7xl '>pullin<span className='text-green-600'>g</span>,Sm<span className='text-red-600'>a</span>rt?</div>
        <div className='flex gap-10 ml-9 mt-20'>
          <button className='bg-gray-700 p-4 px-6 rounded-xl text-white font-bold hover:bg-slate-600'>Start game</button>
          <button className='bg-gray-800 p-4 px-6 rounded-xl text-white font-bold  hover:bg-slate-600'>Rules</button>
        </div>
      </div>
      <div className="w-[60%] md:w-4/12 mx-7 mt-10 md:mt-0">
        <img src='https://upload.wikimedia.org/wikipedia/commons/7/7d/Tic-tac-toe-animated.gif' className="w-full"></img>
      </div>
    </div>
  </div>
  
  
  );
};

export default Home;
