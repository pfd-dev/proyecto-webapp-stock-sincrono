import {
    obtenerTodosLosUsuarios,
    validarUsuario,
    obtenerUsuarioCookie,
    cerrarSesion
} from '../src/models/usuario.model';

describe('Tests de funciones de usuario', () => {
    test('obtenerTodosLosUsuarios debe devolver 3 usuarios', () => {
        const lista = obtenerTodosLosUsuarios();
        expect(lista.length).toBe(3);
        expect(lista[0].nombre).toBe('alfredo');
    });

    test('validarUsuario debe devolver un usuario válido si las credenciales son correctas', () => {
        const usuario = validarUsuario('sergio', 'admin');
        expect(usuario).not.toBeNull();
        expect(usuario?.nombre).toBe('sergio');
        expect(document.cookie).toContain('CACHE-USUARIO-AUTENTICADO=sergio');
    });

    test('validarUsuario debe devolver null si las credenciales son incorrectas', () => {
        const usuario = validarUsuario('sergio', '123456');
        expect(usuario).toBeNull();
    });

    test('obtenerUsuarioCookie debe devolver el usuario si la cookie está presente', () => {
        document.cookie = 'CACHE-USUARIO-AUTENTICADO=carla';
        const usuario = obtenerUsuarioCookie();
        expect(usuario).not.toBeNull();
        expect(usuario?.nombre).toBe('carla');
    });

    // test('obtenerUsuarioCookie debe devolver null si no hay cookie', () => {
    //     document.cookie = '';
    //     const usuario = obtenerUsuarioCookie();
    //     expect(usuario).toBeNull();
    // });

    test('cerrarSesion debe eliminar la cookie', () => {
        document.cookie = 'CACHE-USUARIO-AUTENTICADO=carla';
        cerrarSesion();
        expect(document.cookie).not.toContain('CACHE-USUARIO-AUTENTICADO');
    });
});
