import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { IUsuario } from "../types/types";
import { cerrarSesion, obtenerUsuarioCookie, validarUsuario } from "../models/usuario.model";

interface UsuarioState {
    usuario: IUsuario | null;
}

const initialState: UsuarioState = {
    usuario: null
};

const usuarioSlice = createSlice({
    name: "usuario",
    initialState,
    reducers: {
        cargarUsuarioCookie(state) {
            const usuario = obtenerUsuarioCookie();
            if (usuario) {
                state.usuario = usuario;
            }
        },
        validarDatosLogin(state, action: PayloadAction<{ nombre: string; contrasenia: string }>) {
            const usuario = validarUsuario(action.payload.nombre, action.payload.contrasenia);
            if (usuario) {
                state.usuario = usuario;
            }
        },
        logout(state) {
            cerrarSesion();
            state.usuario = null;
        }
    }
});

export const {
    cargarUsuarioCookie,
    validarDatosLogin,
    logout
} = usuarioSlice.actions;

export default usuarioSlice.reducer;
