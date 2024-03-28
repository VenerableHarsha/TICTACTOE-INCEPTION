import { Provider } from "react-redux";
import { Inception } from "./componenets/Inception";
import appStore from "./componenets/utilities/appStore";


function App() {
  return (
    <Provider store={appStore}>
    <div className="flex justify-center mt-8">
      
   <Inception/>
   </div>
   </Provider>
   
   
  );
}

export default App;