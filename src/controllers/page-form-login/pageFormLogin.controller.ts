// Store
import store from '../../store/store';
import { validarDatosLogin } from '../../slices/userSlice';

export function formularioLoginController() {
    console.log('Página: Formulario login (#PageFormLogin)');
    
    const formulario = document.querySelector<HTMLFormElement>('#formLogin');
    if (!formulario) {
        // console.warn('No existe el formulario');
        return;
    }

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const inputNombre = document.querySelector<HTMLInputElement>('#name');
        const inputContrasenia = document.querySelector<HTMLInputElement>('#password');
        if (!inputNombre || !inputContrasenia) {
            alert('campos vacios');
            return;
        }

        store.dispatch(validarDatosLogin({ nombre: inputNombre.value, contrasenia: inputContrasenia.value }));

        console.log("datos finalizados")

        if (store.getState().usuario.usuario) {
            alert('Login exitoso');
            window.location.href = '/pages/page-dashboard.html';
        }
        else {
            alert('Usuario no encontrado');
            window.location.href = '/';
        }
    });
}
