
import './App.css';
import { Provider } from 'react-redux';
import appStore from './utilities/appStore';
import { Smallxox } from './components/Smallxox';

function App() {
  return (
    <div>
      <div className='flex justify-center p-4 text-4xl font-bold text-gray-500'>Inception</div>
    <div className='flex justify-center'>
      <Provider store={appStore}>
    
 <div className="flex-col ">
  <div className='flex'>
    <div className='border-4 rounded-2xl border-green-500'>
    <Smallxox/>
    </div>
    <Smallxox/>
    <Smallxox/>
    </div>
<div className='flex'>
    <Smallxox/>
    <Smallxox/>
    <Smallxox/>
    </div>
<div className='flex'>
    <Smallxox/>
    <Smallxox/>
    <Smallxox/>
    </div>
    </div>
    </Provider>
    </div>
    </div>
   
  );
}

export default App;
