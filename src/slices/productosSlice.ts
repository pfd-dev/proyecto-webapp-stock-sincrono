import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IProducto } from "../types/types";

import {
    obtenerProductosBBDDLS,
    crearProductoBBDDLS,
    actualizarProductoBBDDLS,
    eliminarProductoBBDDLS
} from "../models/producto.model";

type EstadoProductos = {
    productosBBDDIndexDB: IProducto[];
    productosBBDDLS: IProducto[];
    cargando: boolean;
    error: string | null;
};

const estadoInicial: EstadoProductos = {
    productosBBDDIndexDB: [],
    productosBBDDLS: [],
    cargando: false,
    error: null
};

const productosSlice = createSlice({
    name: "productos",
    initialState: estadoInicial,
    reducers: {
        cargarProductosBBDDLocalStorage: (state) => {
            const productos = obtenerProductosBBDDLS();
            state.productosBBDDLS = productos;
            state.error = null;
        },
        crearProductoLS: (state, action: PayloadAction<{ nombre: string; precio: number }>) => {
            state.productosBBDDLS = crearProductoBBDDLS(action.payload.nombre, action.payload.precio);
            state.error = null;
        },
        actualizarProductoLS: (state, action: PayloadAction<IProducto>) => {
            state.productosBBDDLS = actualizarProductoBBDDLS(action.payload);
            state.error = null;
        },
        eliminarProductoLS: (state, action: PayloadAction<number>) => {
            state.productosBBDDLS = eliminarProductoBBDDLS(action.payload);
            state.error = null;
        }
    },
});


export default productosSlice.reducer;

export const {
    cargarProductosBBDDLocalStorage,
    crearProductoLS,
    actualizarProductoLS,
    eliminarProductoLS
} = productosSlice.actions;

