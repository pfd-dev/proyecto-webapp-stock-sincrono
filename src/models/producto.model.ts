import { IProducto } from "../types/types";

const CLAVE_LS = "BBDD-PRODUCTOS-STOCK";

export function obtenerProductosBBDDLS(): IProducto[] {
    const datos = window.localStorage.getItem(CLAVE_LS);
    if (datos !== null) {
        const productos = JSON.parse(datos);
        if (Array.isArray(productos)) {
            return productos;
        }
    }
    return [];
}

export function crearProductoBBDDLS(nombre: string, precio: number): IProducto[] {
    const datos = window.localStorage.getItem(CLAVE_LS);
    let productos: IProducto[] = [];

    if (datos !== null) {
        productos = JSON.parse(datos);
    }

    const nuevoProducto: IProducto = {
        id: Date.now(),
        nombre: nombre,
        precio: precio
    };

    productos.push(nuevoProducto);

    window.localStorage.setItem(CLAVE_LS, JSON.stringify(productos));
    return productos;
}

export function actualizarProductoBBDDLS(productoEditado: IProducto): IProducto[] {
    const datos = window.localStorage.getItem(CLAVE_LS);
    let productos: IProducto[] = [];

    if (datos !== null) {
        productos = JSON.parse(datos);
    }

    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === productoEditado.id) {
            productos[i] = productoEditado;
        }
    }

    window.localStorage.setItem(CLAVE_LS, JSON.stringify(productos));
    return productos;
}

export function eliminarProductoBBDDLS(id: number): IProducto[] {
    const datos = window.localStorage.getItem(CLAVE_LS);
    let productos: IProducto[] = [];

    if (datos !== null) {
        productos = JSON.parse(datos);
    }

    const nuevosProductos: IProducto[] = [];

    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id !== id) {
            nuevosProductos.push(productos[i]);
        }
    }

    window.localStorage.setItem(CLAVE_LS, JSON.stringify(nuevosProductos));
    return nuevosProductos;
}

export function limpiarProductosBBDDLS(): void {
    window.localStorage.setItem(CLAVE_LS, JSON.stringify([]));
    console.warn("La base de datos de productos fue vaciada.");
}

export function iniciarCreacionBBDDProductosLS() {
    const datos = window.localStorage.getItem(CLAVE_LS);
    let productos: IProducto[] = [];

    if (datos !== null) {
        productos = JSON.parse(datos);
    }

    window.localStorage.setItem(CLAVE_LS, JSON.stringify(productos));
}

