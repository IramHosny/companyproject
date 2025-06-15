import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import usersSlice from './usersSlice'
import  articleSlice  from './articleSlice'
import cartSlice from './cartSlice'
import orderSlice from './orderSlice'
import promotionReducer from './promotionSlice';
import devisReducer from "./devisSlice";
import demandePersoReducer from "./demandePersoSlice";
import notificationReducer from './notificationSlice';
export const store = configureStore({
  reducer: {
user : userSlice,
users : usersSlice,
article : articleSlice,
cart: cartSlice,
order : orderSlice,
promotion: promotionReducer,
 devis: devisReducer,
 demandePerso: demandePersoReducer,
notification: notificationReducer, 
 
  },
})