// store
import store from '../../store/store';
import { limpiarCarritoLS } from '../../slices/carritoSlice';
import { imprimirLista } from './fnImprimirProductos';

store.subscribe(() => {
    if (document.querySelector('#pageShoppingCartMain')) {
        pageShoppingCartMain();
    }
});

export default function pageShoppingCartMain() {
    console.log('Página: Carrio de compras (#pageShoppingCartMain)');

    imprimirLista(store.getState().carrito.productos, "#Contenido");


    store.subscribe(() => {
        console.log("se actualizo el estado")
        imprimirLista(store.getState().carrito.productos, "#Contenido");
    });

    const formulario = document.querySelector<HTMLFormElement>('#FormCarrito');
    const btnLimpiarCarritoLS = document.querySelector("#btnLimpiarCarrito")
    if (!formulario || !btnLimpiarCarritoLS) {
        return;
    }

    formulario.addEventListener("submit", (evento: SubmitEvent) => {
        evento.preventDefault()
        alert("limpiando cache del carrito")
        store.dispatch(limpiarCarritoLS());
    })
}