
import { IProducto } from "../types/types";
import { obtenerProductosBBDDLS } from "./producto.model";

const CLAVE_CARRITO = "CACHE-PRODUCTOS-CARRITO";

export function obtenerProductoCarritoCache(): IProducto[] {
    const datos = localStorage.getItem(CLAVE_CARRITO);
    let idsCarrito: number[] = [];

    if (datos !== null) {
        idsCarrito = JSON.parse(datos);
    }

    if (idsCarrito.length === 0) {
        return [];
    }

    const productos = obtenerProductosBBDDLS();
    const productosDelCarrito: IProducto[] = [];

    for (let i = 0; i < productos.length; i++) {
        for (let j = 0; j < idsCarrito.length; j++) {
            if (productos[i].id === idsCarrito[j]) {
                productosDelCarrito.push(productos[i]);
            }
        }
    }

    return productosDelCarrito;
}

export function agregarProductoCarrito(id: number): number[] {
    const datos = localStorage.getItem(CLAVE_CARRITO);
    let ids: number[] = [];

    if (datos !== null) {
        ids = JSON.parse(datos);
    }

    const nuevosIDs: number[] = [id];

    for (let i = 0; i < ids.length; i++) {
        nuevosIDs.push(ids[i]);
    }

    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(nuevosIDs));
    return nuevosIDs;
}

export function removerProductoCarrito(id: number): number[] {
    const datos = localStorage.getItem(CLAVE_CARRITO);
    let ids: number[] = [];

    if (datos !== null) {
        ids = JSON.parse(datos);
    }

    const idsActualizados: number[] = [];

    for (let i = 0; i < ids.length; i++) {
        if (ids[i] !== id) {
            idsActualizados.push(ids[i]);
        }
    }

    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(idsActualizados));
    return idsActualizados;
}

export function limpiarProductosCarrito(): void {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify([]));
    console.warn("El carrito fue vaciado.");
}

// export function iniciarCreacionBBDD(): void {
//     const datos = localStorage.getItem(CLAVE_CARRITO);

//     if (datos === null) {
//         localStorage.setItem(CLAVE_CARRITO, JSON.stringify([]));
//     }
// }
