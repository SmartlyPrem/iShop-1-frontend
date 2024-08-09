import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './reducer/CartSlice'
import UserSlice from './reducer/UserSlice';
import Checkoutslice from './reducer/CheckoutSlice';
import AdminSlice from './reducer/AdminSlice';

const Store = configureStore(
    {
        reducer: {
            cart: CartReducer,
            user : UserSlice,
            checkout : Checkoutslice,
            admin : AdminSlice
        }
    }
)

export default Store;