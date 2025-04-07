"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./slices/cartSlice";
import addressReducer from "./slices/addressSlice";
import voucherReducer from "./slices/voucherSlice";
import paymentReducer from "./slices/paymentSlice";
import favouriteReducer from "./slices/favouriteSlice";  
import filterReducer from "./slices/filterSlice";  

// Persist configs
const cartPersistConfig = {
  key: "cart",
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  address: addressReducer,
  voucher: voucherReducer,
  payment: paymentReducer,
  favourites: favouriteReducer, 
  filter: filterReducer,

});

// Store setup
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
