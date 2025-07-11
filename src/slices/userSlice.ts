import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { IUsuario } from "../types/types";
import { cerrarSesion, obtenerUsuarioCookie, validarUsuario } from "../models/usuario.model";

interface UsuarioState {
    usuario: IUsuario | null;
    autenticado: boolean;
}

const initialState: UsuarioState = {
    usuario: null,
    autenticado: false
};

const usuarioSlice = createSlice({
    name: "usuario",
    initialState,
    reducers: {
        cargarUsuarioCookie(state) {
            const usuario = obtenerUsuarioCookie();
            console.log("usuario cargado")
            console.log(usuario)
            if (usuario?.nombre !== '') {
                state.usuario = usuario;
                state.autenticado = true;
            }
        },
        validarDatosLogin(state, action: PayloadAction<{ nombre: string; contrasenia: string }>) {
            const usuario = validarUsuario(action.payload.nombre, action.payload.contrasenia);
            if (usuario) {
                state.usuario = usuario;
                state.autenticado = true;
            }
        },
        logout(state) {
            cerrarSesion();
            state.usuario = null;
            state.autenticado = false;
        }
    }
});

export const {
    cargarUsuarioCookie,
    validarDatosLogin,
    logout
} = usuarioSlice.actions;

export default usuarioSlice.reducer;
