// Store
import store from './store/store';
import { inciarEstadoCarrito } from './slices/carritoSlice';
import { cargarProductosBBDDLocalStorage } from './slices/productosSlice';
import { cargarUsuarioCookie } from './slices/userSlice';
// Enrutadores
import { enrutador } from './routers/router';
// UIs
import { inicializarBarraNavegacion } from './controllers/navbar/navbar.controller';

function iniciarCargaDatosBBDD() {
    store.dispatch(cargarProductosBBDDLocalStorage());
    store.dispatch(cargarUsuarioCookie());
    store.dispatch(inciarEstadoCarrito());
}

function inicializarCargaDatosUI() {
    enrutador();
    inicializarBarraNavegacion();
}

async function main() {
    iniciarCargaDatosBBDD();

    inicializarCargaDatosUI();

    console.log("fin de la aplicación!!!")
}

document.addEventListener('DOMContentLoaded', main);