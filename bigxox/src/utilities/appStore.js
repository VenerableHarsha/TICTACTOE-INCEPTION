import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./sliceofstore/cartSlice";
const appStore=configureStore(
    {
        reducer:{
            cart:cartReducer,
        }
    }

);
export default appStore;