import { Provider } from "react-redux";
import { Inception } from "./componenets/Inception";
import appStore from "./componenets/utilities/appStore";
import Home from "./componenets/Home";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


function App() {
  const appRouter=createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/playgame",
        element: <Provider store={appStore}>
        <div className="flex justify-center bg-gradient-to-tr from-slate-800 from-10% via-slate-900  to-black w-[100%] ">
          
        <Inception/>
        </div>
        </Provider>
    }
])
  return (
    <div>
        <RouterProvider router={appRouter}></RouterProvider>
    </div>
   
   
   
  );
}
{ }

export default App;
