import './App.css';
import { Provider } from 'react-redux';
import appStore from './utilities/appStore';
import { Smallxox } from './components/Smallxox';

function App() {
  return (
    <div>
      <div className='flex justify-center p-4 text-4xl font-bold text-gray-500'>Inception</div>
      <div className='flex justify-center '>
        <Provider store={appStore}>
          <div className="flex-col ">
            <div className='flex mr-10'>

                <Smallxox/>


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
          <div className="flex items-center ">
            <Smallxox />
          </div>
        </Provider>
      </div>
    </div>
  );
}

export default App;
