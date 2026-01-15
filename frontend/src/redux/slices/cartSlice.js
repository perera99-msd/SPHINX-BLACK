// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id && item.size === newItem.size);
      
      const maxStock = newItem.maxStock || 99; // Fallback if not provided

      if (existingItem) {
        // Enforce stock limit
        const totalAfterAdd = existingItem.quantity + (newItem.quantity || 1);
        if (totalAfterAdd <= maxStock) {
            existingItem.quantity += newItem.quantity || 1;
        } else {
            existingItem.quantity = maxStock; // Cap at max
        }
      } else {
        state.items.push({
          ...newItem,
          quantity: Math.min(newItem.quantity || 1, maxStock),
          maxStock: maxStock // Store this for later
        });
      }
      
      // Recalculate totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        // Enforce maxStock check here as well
        const limit = item.maxStock || 99;
        if (quantity > limit) {
             item.quantity = limit;
        } else {
             item.quantity = Math.max(1, quantity);
        }
      }
      
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },

    setCart: (state, action) => {
      state.items = action.payload.items || [];
      state.totalQuantity = action.payload.totalQuantity || 0;
      state.totalAmount = action.payload.totalAmount || 0;
    }
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  setCart 
} = cartSlice.actions;

export default cartSlice.reducer;