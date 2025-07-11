import type { IProducto } from '../../types/types';

function crearItemProducto(producto: IProducto): HTMLElement {
    const itemLista = document.createElement('li');
    itemLista.className = 'list-group-item d-flex justify-content-between align-items-center';

    const infoProducto = document.createElement('div');
    infoProducto.className = 'd-flex align-items-center';

    const numeroProducto = document.createElement('span');
    numeroProducto.className = 'badge bg-primary rounded-pill me-3';
    numeroProducto.textContent = (producto.id).toString();

    const nombreProducto = document.createElement('span');
    nombreProducto.className = 'fw-bold me-3';
    nombreProducto.textContent = producto.nombre;

    const precioProducto = document.createElement('span');
    precioProducto.className = 'text-success fs-6';
    precioProducto.textContent = `$${producto.precio.toString()}`;

    infoProducto.appendChild(numeroProducto);
    infoProducto.appendChild(nombreProducto);
    infoProducto.appendChild(precioProducto);

    const contenedorBotones = document.createElement('div');
    contenedorBotones.className = 'd-flex gap-2';

    const btnInfo = document.createElement('button');
    btnInfo.className = 'btn btn-info btn-sm';
    btnInfo.textContent = 'Info';
    btnInfo.addEventListener('click', function () {
        console.log('Abrir modal para producto:', producto.id);
    });

    const linkEditar = document.createElement('a');
    linkEditar.className = 'btn btn-warning btn-sm';
    linkEditar.href = `/pages/page-update-product.html?id=${producto.id}`;
    linkEditar.textContent = 'Editar';

    const linkEliminar = document.createElement('a');
    linkEliminar.className = 'btn btn-danger btn-sm';
    linkEliminar.href = `/pages/page-remove-product.html?id=${producto.id}`;
    linkEliminar.textContent = 'Eliminar';

    contenedorBotones.appendChild(btnInfo);
    contenedorBotones.appendChild(linkEditar);
    contenedorBotones.appendChild(linkEliminar);

    itemLista.appendChild(infoProducto);
    itemLista.appendChild(contenedorBotones);

    return itemLista;
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
        alertVacia.innerHTML = '<h4>Lista vacía</h4><p>No hay productos disponibles en este momento.</p>';

        contenedorLista.appendChild(alertVacia);
    } else {
        const listaProductos = document.createElement('ol');
        listaProductos.className = 'list-group list-group-numbered';

        for (let i = 0; i < pLista.length; i++) {
            const itemProducto = crearItemProducto(pLista[i]);
            listaProductos.appendChild(itemProducto);
        }

        contenedorLista.appendChild(listaProductos);
    }
}