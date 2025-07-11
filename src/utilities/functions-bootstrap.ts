import { Modal } from 'bootstrap';

export function cerrarModal(selector = "") {
    const elemento = document.querySelector(selector) as HTMLElement;
    const modal = Modal.getInstance(elemento);
    if (modal) {
        modal.hide();
    }
}