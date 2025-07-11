// Store
import store from '../../store/store';
import { comprarProducto } from '../../slices/carritoSlice';
// Tipos de datos
import type { IProducto } from '../../types/types';

function crearItemProducto1(producto: IProducto): HTMLElement {
    const itemLista = document.createElement('div');
    itemLista.className = 'col-12 col-md-4 col-lg-3 mb-4';

    const card = document.createElement('div');
    card.className = 'card h-100';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';

    const tituloProducto = document.createElement('h4');
    tituloProducto.className = 'card-title mb-3 text-center';
    tituloProducto.textContent = producto.nombre;

    const precioProducto = document.createElement('p');
    precioProducto.className = 'card-text fw-bold mb-3';
    precioProducto.innerHTML = `Precio: <span class='text-success fs-4'>$${producto.precio.toString()}<span>`;

    const btnCompra = document.createElement('button');
    btnCompra.className = 'btn btn-primary mt-auto';
    btnCompra.textContent = 'Comprar';
    btnCompra.addEventListener('click', function () {
        store.dispatch(comprarProducto(producto.id));
    });

    cardBody.appendChild(tituloProducto);
    cardBody.appendChild(precioProducto);
    cardBody.appendChild(btnCompra);

    card.appendChild(cardBody);
    itemLista.appendChild(card);

    return itemLista;
}

export function imprimitLista1(pLista: IProducto[], pContenedor: string) {
    const contenedorLista = document.querySelector(pContenedor);
    if (!contenedorLista) {
        return;
    }

    contenedorLista.className = 'container-fluid';
    contenedorLista.innerHTML = '';

    const row = document.createElement('div');
    row.className = 'row';

    if (pLista.length === 0) {
        const colVacia = document.createElement('div');
        colVacia.className = 'col-12';

        const alertVacia = document.createElement('div');
        alertVacia.className = 'text-center text-white';
        alertVacia.innerHTML = '<h4>Lista vacía</h4><p>No hay productos disponibles en este momento.</p>';

        colVacia.appendChild(alertVacia);
        row.appendChild(colVacia);
    } else {
        for (let i = 0; i < pLista.length; i++) {
            const itemProducto = crearItemProducto1(pLista[i]);
            row.appendChild(itemProducto);
        }
    }

    contenedorLista.appendChild(row);
}

function crearItemProducto2(producto: IProducto): HTMLElement {
    const itemLista = document.createElement('div');
    itemLista.className = 'col-12 col-md-4 col-lg-3 mb-4';

    const card = document.createElement('div');
    card.className = 'card h-100';

    const cardImg = document.createElement('img');
    cardImg.className = 'card-img-top';
    cardImg.src = producto.imagen || '';
    cardImg.alt = producto.nombre;
    cardImg.style.height = '200px';
    cardImg.style.objectFit = 'cover';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';

    const tituloProducto = document.createElement('h4');
    tituloProducto.className = 'card-title mb-3 text-center';
    tituloProducto.textContent = producto.nombre;

    const precioProducto = document.createElement('p');
    precioProducto.className = 'card-text fw-bold mb-3';
    precioProducto.innerHTML = `Precio: <span class='text-success fs-4'>$${producto.precio.toString()}</span>`;

    const contenedorBotones = document.createElement('div');
    contenedorBotones.className = 'd-flex gap-2 mt-auto';

    const btnVer = document.createElement('button');
    btnVer.className = 'btn btn-outline-primary flex-fill';
    btnVer.textContent = 'Ver';
    btnVer.addEventListener('click', function () {
        console.log('Ver producto:', producto.id);
    });

    const btnCompra = document.createElement('button');
    btnCompra.className = 'btn btn-primary flex-fill';
    btnCompra.textContent = 'Comprar';
    btnCompra.addEventListener('click', function () {
        store.dispatch(comprarProducto(producto.id));
    });

    contenedorBotones.appendChild(btnVer);
    contenedorBotones.appendChild(btnCompra);

    cardBody.appendChild(tituloProducto);
    cardBody.appendChild(precioProducto);
    cardBody.appendChild(contenedorBotones);

    card.appendChild(cardImg);
    card.appendChild(cardBody);
    itemLista.appendChild(card);

    return itemLista;
}

export function imprimirLista2(pLista: IProducto[], pContenedor: string) {
    const contenedorLista = document.querySelector(pContenedor);
    if (!contenedorLista) {
        return;
    }

    contenedorLista.className = 'container-fluid';
    contenedorLista.innerHTML = '';

    const row = document.createElement('div');
    row.className = 'row';

    if (pLista.length === 0) {
        const colVacia = document.createElement('div');
        colVacia.className = 'col-12';

        const alertVacia = document.createElement('div');
        alertVacia.className = 'text-center text-white';
        alertVacia.innerHTML = '<h4>Lista vacía</h4><p>No hay productos disponibles en este momento.</p>';

        colVacia.appendChild(alertVacia);
        row.appendChild(colVacia);
    } else {
        for (let i = 0; i < pLista.length; i++) {
            const itemProducto = crearItemProducto2(pLista[i]);
            row.appendChild(itemProducto);
        }
    }

    contenedorLista.appendChild(row);
}