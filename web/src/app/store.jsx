import {configureStore} from '@reduxjs/toolkit';
import drawerSlice from "../features/drawerSlice";
import cartSlice from "../features/cartSlice";
import productsSlice from "../features/productsSlice";

export const store = configureStore({
    reducer: {
        drawer: drawerSlice,
        cart: cartSlice,
        products: productsSlice,
    },
})