import { configureStore, createSlice } from '@reduxjs/toolkit';
import { UNSAFE_getTurboStreamSingleFetchDataStrategy } from 'react-router-dom';
const savedcart =localStorage.getItem("cart");
  const q =savedcart?JSON.parse(savedcart):[];
// Product Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    Veg: [
      { name: 'Tomato', price: 200.5, img: 'images/tomato.jpg' },
      { name: 'Onion', price: 100.5, img: 'images/Onion.jpg' },
      { name: 'Potato', price: 95.5, img: 'images/potato.jpg' },
      { name: 'Carrot', price: 65.5, img: 'images/carrot.jpg' },
      { name: 'Beetroot', price: 55.0, img: 'images/Beetroot.jpg' },
      { name: 'Ladyfinger', price: 85.5, img: 'images/Ladyfinger.jpg' },
      { name: 'Radish', price: 25.5, img: 'images/Radish.jpg' },
      { name: 'Cabbage', price: 45.5, img: 'images/Cabbage.jpg' },
      { name: 'Cauliflower', price: 55.0, img: 'images/Califlower.jpg' },
      { name: 'Spinach', price: 25.5, img: 'images/Spinach.jpg' }
    ],
    NonVeg: [
      { name: 'Chicken', price: 800.0, img: 'images/Chicken.jpg' },
      { name: 'Fish', price: 600.0, img: 'images/Fish.jpg' },
      { name: 'Mutton', price: 700.0, img: 'images/Mutton.jpg' },
      { name: 'Lobster', price: 65.5, img: 'images/Lobster.jpg' },
      { name: 'Duck', price: 150.0, img: 'images/Duck.jpg'},
      { name:'Prawns', price:175.5, img:'images/Prawns.jpg'},
    ]
  },
  reducers: {}
});

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState:q,
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incCart: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) item.quantity += 1;
    },
    decCart: (state, action) => {
      const index = state.findIndex(i => i.name === action.payload.name);
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
        } else {
          state.splice(index, 1);
        }
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(i => i.name !== action.payload.name);
    },

    // Action to clear the cart
    clearCart: () => {
      return [];
    }
  }
});

// Store configuration
const Store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer
  }
});

Store.subscribe(()=>{
  const state=Store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart));
   })
// Export actions
export const { addToCart, incCart, decCart, removeFromCart, clearCart } = cartSlice.actions;
export default Store;
