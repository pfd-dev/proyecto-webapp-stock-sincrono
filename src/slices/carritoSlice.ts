// Funciones Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';
// Tipos de datos
import type { IProducto } from '../types/types';
// Funciones modelo
import { limpiarProductosCarrito, agregarProductoCarrito, obtenerProductoCarritoCache, removerProductoCarrito } from '../models/carrito.model';

const listaProductos: IProducto[] = [];

const initialState = {
    productos: listaProductos,
    cantidadProductos: 0,
    totalCarrito: 0
};

const carritoSlice = createSlice({
    name: 'carritoSlice',
    initialState: initialState,
    reducers: {
        inciarEstadoCarrito: (state) => {
            state.productos = obtenerProductoCarritoCache();
            state.cantidadProductos = state.productos.length
            for (let i = 0; i < state.productos.length; i++) {
                state.totalCarrito += state.productos[i].precio
            }
        },
        comprarProducto: (state, actions) => {
            agregarProductoCarrito(actions.payload);
            state.cantidadProductos++
        },
        quitarProducto: (state, actions) => {
            removerProductoCarrito(actions.payload);
            state.cantidadProductos--;
        },
        limpiarCarritoLS: (state) => {
            limpiarProductosCarrito()
            state.productos = [];
            state.cantidadProductos = 0;
            state.totalCarrito = 0;
        }
    }
});

export default carritoSlice.reducer;

export const { comprarProducto, inciarEstadoCarrito, limpiarCarritoLS, quitarProducto } = carritoSlice.actions;
