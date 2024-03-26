
import './App.css';
import { Provider } from 'react-redux';
import appStore from './utilities/appStore';
import { Smallxox } from './components/Smallxox';

function App() {
  return (
    <div>
      <Provider store={appStore}>
    
 
    <Smallxox/>
    </Provider>
    </div>
   
  );
}

export default App;
