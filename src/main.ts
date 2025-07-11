import { iniciarCreacionBBDDProductosLS } from './models/producto.model';
// Store
import store from './store/store';
import { inciarEstadoCarrito } from './slices/carritoSlice';
import { cargarProductosBBDDLocalStorage } from './slices/productosSlice';
import { cargarUsuarioCookie } from './slices/userSlice';
// Enrutadores
import { enrutador } from './routers/router';
// UIs
import { inicializarBarraNavegacion } from './controllers/navbar/navbar.controller';
import { iniciarCreacionBBDDUsuarioCook } from './models/usuario.model';
import { iniciarCreacionBBDDCarritoLS } from './models/carrito.model';

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
    iniciarCreacionBBDDProductosLS();
    iniciarCreacionBBDDUsuarioCook();
    iniciarCreacionBBDDCarritoLS();

    iniciarCargaDatosBBDD();

    inicializarCargaDatosUI();

    console.log("fin de la aplicación!!!")
}

document.addEventListener('DOMContentLoaded', main);