import store from "../../store/store"
import { imprimirLista } from "./fnImprimirProductos";

export function dashboardController() {
    console.log('Página: panel de control (#PageDashboard)');
    
    imprimirLista(store.getState().productos.productosBBDDLS, '#ContenedorStockLocalStorage');
}
