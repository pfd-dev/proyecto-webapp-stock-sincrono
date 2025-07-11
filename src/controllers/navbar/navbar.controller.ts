// Store
import store from '../../store/store';
import { logout } from '../../slices/userSlice';

store.subscribe(() => {
    if (document.querySelector('#BarraNavegacion')) {
        inicializarBarraNavegacion();
    }
});

export function inicializarBarraNavegacion() {
    const linksRutas = {
        rutasDefault: [
            {
                nombre: 'inicio',
                url: '/index.html'
            },
            {
                nombre: 'carrito ' + store.getState().carrito.cantidadProductos,
                url: '/pages/page-shopping-cart.html'
            }
        ],
        rutasPublicas: [
            {
                nombre: 'login',
                url: '/pages/page-formulario-login.html'
            }
        ],
        rutasPrivadas: [
            {
                nombre: 'panel de control',
                url: '/pages/page-dashboard.html'
            },
            // {
            //     nombre: 'crear productos',
            //     url: '/pages/page-create-product.html'
            // },
            // {
            //     nombre: 'eliminar productos',
            //     url: '/pages/page-remove-product.html'
            // },
            // {
            //     nombre: 'actualizar productos',
            //     url: '/pages/page-update-product.html'
            // },
            {
                nombre: 'cerrar session',
                url: '#'
            },
        ],
    };

    const contenedorLinks = document.querySelector<HTMLElement>('#BarraNavegacion ul');
    if (!contenedorLinks) {
        return
    }

    contenedorLinks.innerHTML = '';

    generarLink(linksRutas.rutasDefault, contenedorLinks);

    if (!store.getState().usuario.autenticado) {
        generarLink(linksRutas.rutasPublicas, contenedorLinks);
    } else {
        generarLink(linksRutas.rutasPrivadas, contenedorLinks);
    }
}

function generarLink(pLista = [{ nombre: "", url: "" }], contenedor: HTMLElement | null = null) {
    if (!contenedor) {
        return
    }

    for (let index = 0; index < pLista.length; index++) {
        const itemList = document.createElement('li');
        itemList.className = 'nav-item';

        const itemLink = document.createElement('a');
        itemLink.textContent = pLista[index].nombre;
        itemLink.href = pLista[index].url;

        if (pLista[index].nombre === "login") {
            itemLink.className = 'btn btn-success btn px-3';
        } else if (pLista[index].nombre === "cerrar session") {
            itemLink.className = 'btn btn-danger px-3';
            itemLink.addEventListener("click", () => {
                store.dispatch(logout())
                window.location.href = '/';
            })
        } else if (pLista[index].nombre === 'carrito ' + store.getState().carrito.cantidadProductos) {
            itemLink.className = 'nav-link active';
            itemLink.title = 'total: $' + store.getState().carrito.totalCarrito.toString()
        } else {
            itemLink.className = 'nav-link active';
        }

        itemList.appendChild(itemLink);
        contenedor.appendChild(itemList);
    }
}