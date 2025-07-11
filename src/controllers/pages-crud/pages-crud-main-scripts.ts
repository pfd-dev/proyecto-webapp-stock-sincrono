import { actualizarProductoLS, eliminarProductoLS, crearProductoLS } from "../../slices/productosSlice";
import store from "../../store/store";

export function paginaFormularioCrearProducto() {
    console.log('Página: Carrio de compras (#PageCreateProduct)');

    const inpurtNombre = document.querySelector<HTMLInputElement>('#NombreProducto');
    const inputPrecio = document.querySelector<HTMLInputElement>('#PrecioProducto');
    const formCrear = document.querySelector("#FormularioCrearProducto");

    if (!inpurtNombre || !inputPrecio || !formCrear) {
        return
    }

    if (!store.getState().usuario.usuario) {
        const contenedor = document.querySelector("#PageCreateProduct");
        if (!contenedor) {
            return
        }
        contenedor.innerHTML = ""
    }


    formCrear.addEventListener('submit', function (event) {
        event.preventDefault();

        store.dispatch(crearProductoLS({ nombre: inpurtNombre.value, precio: parseInt(inputPrecio.value) }));

        alert("Elemento creado exitosamente");
        window.location.href = "../index.html";
    });
}

export function paginaFormularioEditarProducto() {
    console.log('Página: Carrio de compras (#PageUpdateProduct)');

    const listaInicial = store.getState().productos.productosBBDDLS || [];

    if (listaInicial.length === 0) {
        alert("no hay datos")
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const idProduct = parseInt(params.get('id') || '');

    if (!idProduct) {
        alert("error URL");
        return;
    }

    const product = listaInicial.find((producto) => producto.id === idProduct);

    if (!product) {
        alert("error Lista, no existe el id");
        return;
    }

    const inpurtNombre = document.querySelector<HTMLInputElement>('#NombreProducto');
    const inputPrecio = document.querySelector<HTMLInputElement>('#PrecioProducto');

    if (!inpurtNombre || !inputPrecio) {
        return
    }

    inpurtNombre.value = product?.nombre || '';
    inputPrecio.value = product?.precio.toString() || '';

    const formEditar = document.querySelector('#FormularioEditarProducto');
    if (formEditar) {
        formEditar.addEventListener('submit', function (event) {
            event.preventDefault();

            store.dispatch(actualizarProductoLS({ id: product.id, nombre: inpurtNombre.value, precio: parseInt(inputPrecio.value) }));
            alert('Elemento editado exitosamente');
            window.location.href = 'page-dashboard.html';
        });
    }
}

export function paginaFormularioEliminarProducto() {
    console.log('Página: Carrio de compras (#PageRemoveProduct)');

    const listaInicial = store.getState().productos.productosBBDDLS || [];

    if (listaInicial.length === 0) {
        alert("no hay datos")
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const idProduct = parseInt(params.get('id') || '');

    if (!idProduct) {
        alert("error URL")
        return;
    }

    const product = listaInicial.find((producto) => producto.id === idProduct);

    if (!product) {
        alert("error Lista, no existe el id")
        return;
    }

    const productoSeleccionado = document.querySelector('#ProductoSeleccionado');
    if (!productoSeleccionado) {
        return
    }

    productoSeleccionado.textContent = product?.nombre || ''
    const formEliminar = document.querySelector('#FormularioEliminarProducto');
    if (formEliminar) {
        formEliminar.addEventListener('submit', function (event) {
            event.preventDefault();

            store.dispatch(eliminarProductoLS(product.id));
            alert('Elemento editado exitosamente');
            window.location.href = 'page-dashboard.html';
        });
    }
}
