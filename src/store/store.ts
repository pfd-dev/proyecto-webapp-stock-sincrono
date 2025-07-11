import { configureStore } from '@reduxjs/toolkit';
import productosReducer from '../slices/productosSlice';
import usuarioReducer from '../slices/userSlice';
import carritoReducer from '../slices/carritoSlice';

const store = configureStore({
    reducer: {
        productos: productosReducer,
        usuario: usuarioReducer,
        carrito: carritoReducer
    }
});

export default store;