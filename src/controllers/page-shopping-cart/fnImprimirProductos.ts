// store
import store from './../../store/store';
import { quitarProducto } from '../../slices/carritoSlice';
// tipos
import type { IProducto } from '../../types/types';

function crearFilaProducto(producto: IProducto, indice: number): HTMLElement {
    const fila = document.createElement('tr');

    const celdaNumero = document.createElement('td');
    celdaNumero.className = 'text-center';
    celdaNumero.textContent = (indice + 1).toString();

    const celdaNombre = document.createElement('td');
    celdaNombre.className = 'fw-bold';
    celdaNombre.textContent = producto.nombre;

    const celdaPrecio = document.createElement('td');
    celdaPrecio.className = 'text-success fw-bold';
    celdaPrecio.textContent = `$${producto.precio.toString()}`;

    const celdaAccion = document.createElement('td');
    celdaAccion.className = 'text-center';

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-outline-danger btn-sm';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', function () {
        store.dispatch(quitarProducto(producto.id));
        location.reload()
    });

    celdaAccion.appendChild(btnEliminar);

    fila.appendChild(celdaNumero);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPrecio);
    fila.appendChild(celdaAccion);

    return fila;
}

export function imprimirLista(pLista: IProducto[], pContenedor: string) {
    const contenedorLista = document.querySelector(pContenedor);
    if (!contenedorLista) {
        return;
    }

    contenedorLista.className = 'container-fluid';
    contenedorLista.innerHTML = '';

    if (pLista.length === 0) {
        const alertVacia = document.createElement('div');
        alertVacia.className = 'text-center text-white';
        alertVacia.innerHTML = '<h4>Carrito vacío</h4><p>No hay productos en el carrito.</p>';

        contenedorLista.appendChild(alertVacia);
    } else {
        const tabla = document.createElement('table');
        tabla.className = 'table table-striped table-hover';

        const thead = document.createElement('thead');
        thead.className = 'table-dark';

        const filaEncabezado = document.createElement('tr');

        const encabezados = ['N°', 'Nombre del Producto', 'Precio', 'Acción'];
        for (let i = 0; i < encabezados.length; i++) {
            const th = document.createElement('th');
            th.textContent = encabezados[i];
            th.className = 'text-center';
            filaEncabezado.appendChild(th);
        }

        thead.appendChild(filaEncabezado);

        const tbody = document.createElement('tbody');

        for (let i = 0; i < pLista.length; i++) {
            const filaProducto = crearFilaProducto(pLista[i], i);
            tbody.appendChild(filaProducto);
        }

        const tfoot = document.createElement('tfoot');
        const filaTfoot = document.createElement('tr');
        filaTfoot.className = 'table-secondary';

        const celdaTotalLabel = document.createElement('td');
        celdaTotalLabel.setAttribute('colspan', '2');
        celdaTotalLabel.className = 'text-end fw-bold fs-5';
        celdaTotalLabel.textContent = 'Total:';

        const celdaTotalPrecio = document.createElement('td');
        celdaTotalPrecio.className = 'text-success fw-bold fs-4';

        const estadoCarrito = store.getState().carrito;
        celdaTotalPrecio.textContent = `$${estadoCarrito.totalCarrito.toString()}`;

        const celdaVacia = document.createElement('td');

        filaTfoot.appendChild(celdaTotalLabel);
        filaTfoot.appendChild(celdaTotalPrecio);
        filaTfoot.appendChild(celdaVacia);

        tfoot.appendChild(filaTfoot);

        tabla.appendChild(thead);
        tabla.appendChild(tbody);
        tabla.appendChild(tfoot);

        contenedorLista.appendChild(tabla);
    }
}