import { IUsuario } from "../types/types";

const mockListaUsuarios: IUsuario[] = [
    {
        id: 1,
        nombre: 'alfredo',
        contrasenia: '1234'
    },
    {
        id: 2,
        nombre: 'sergio',
        contrasenia: 'admin'
    },
    {
        id: 3,
        nombre: 'carla',
        contrasenia: 'carla'
    }
];

export let usuarioLogueado: IUsuario | null = null;

export function obtenerTodosLosUsuarios(): IUsuario[] {
    return mockListaUsuarios;
}

export function validarUsuario(nombre: string, contrasenia: string): IUsuario | null {

    for (let i = 0; i < mockListaUsuarios.length; i++) {
        if (mockListaUsuarios[i].nombre === nombre && mockListaUsuarios[i].contrasenia === contrasenia) {
            guardarUsuarioCookie(mockListaUsuarios[i].nombre);
            return mockListaUsuarios[i];
        }
    }

    return null;
}

function guardarUsuarioCookie(nombre: string): void {
    const dias = 1;

    const fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
    const expiracion = "; expires=" + fecha.toUTCString();

    const cookieFinal = "CACHE-USUARIO-AUTENTICADO=" + nombre + expiracion + "; path=/";

    console.log("se creo la cookie:")
    console.log(cookieFinal)
    document.cookie = cookieFinal;
}

export function obtenerUsuarioCookie(): IUsuario | null {
    const partes = document.cookie.split(";");

    for (let i = 0; i < partes.length; i++) {
        const cookie = partes[i].trim();

        const partesCookie = cookie.split("=");

        if (partesCookie[0] === "CACHE-USUARIO-AUTENTICADO") {
            const usuario: IUsuario = {
                id: 1000,
                nombre: partesCookie[1]
            };
            return usuario;
        }
    }

    return null;
}


export function cerrarSesion(): void {
    document.cookie = "CACHE-USUARIO-AUTENTICADO=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // console.warn("Sesión cerrada y cookie eliminada.");
}

export function iniciarCreacionBBDDUsuarioCook(): void {
    const usuario = obtenerUsuarioCookie();

    if (usuario !== null) {
        guardarUsuarioCookie(usuario.nombre);
    } else {
        guardarUsuarioCookie("");
    }
}
