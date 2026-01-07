import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice'; // Import auth

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer, // Add to store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});