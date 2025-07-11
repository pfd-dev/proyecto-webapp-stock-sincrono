import store from '../store/store';
// Funciones Pagina
import pageHomeController from './../controllers/page-home/pageHome.comtroller';
import pageShoppingCartMain from '../controllers/page-shopping-cart/pageShoppingCart.controller';
import { paginaFormularioCrearProducto, paginaFormularioEditarProducto, paginaFormularioEliminarProducto } from './../controllers/pages-crud/pages-crud-main-scripts';
import { formularioLoginController } from './../controllers/page-form-login/pageFormLogin.controller';
import { dashboardController } from '../controllers/page-dashboard/pageDashboard.controller';

// Types y interfaces
type PageController = () => void;

type PageId = 'PageHome' | 'PageShoppingCard' | 'PageFormLogin' | 'PageCreateProduct' | 'PageUpdateProduct' | 'PageRemoveProduct' | 'PageDashboard';

interface RoutesConfig {
    [key: string]: PageController;
}

// Mapeo de IDs a controladores
const rutas: RoutesConfig = {
    'PageHome': pageHomeController,
    'PageShoppingCard': pageShoppingCartMain,
    'PageFormLogin': formularioLoginController,
    'PageCreateProduct': paginaFormularioCrearProducto,
    'PageUpdateProduct': paginaFormularioEditarProducto,
    'PageRemoveProduct': paginaFormularioEliminarProducto,
    'PageDashboard': dashboardController,
};

// Rutas públicas (accesibles sin autenticación)
const rutasDefault: PageId[] = [
    'PageHome',
    'PageShoppingCard',
];
const rutasPublicas: PageId[] = [
    'PageFormLogin',
];

// Rutas privadas (requieren autenticación)
const rutasPrivadas: PageId[] = [
    'PageCreateProduct',
    'PageDashboard',
    'PageUpdateProduct',
    'PageRemoveProduct',
];

export function enrutador(): void {
    // Buscar página activa por su ID
    let paginaActiva: PageId | null = null;

    for (const ruta in rutas) {
        if (document.querySelector(`#${ruta}`)) {
            paginaActiva = ruta as PageId;
            break;
        }
    }

    // Si no se encuentra ninguna página, mostrar página de error
    if (!paginaActiva) {
        window.location.href = "/404.html";
        console.warn('No se encontró ninguna página activa');
        return;
    }

    const usuarioAutenticado = store.getState().usuario.autenticado;

    if (rutasPublicas.includes(paginaActiva)) {
        rutas[paginaActiva](); // Ejecutar página pública
        return;
    }

    if (rutasPrivadas.includes(paginaActiva)) {
        if (usuarioAutenticado) {
            rutas[paginaActiva](); // Ejecutar página privada
        } else {
            console.warn("Acceso denegado. Debes iniciar sesión.");
            const contenedor = document.querySelector("main section");
            if (!contenedor) {
                return
            }
            contenedor.innerHTML = "<p class='text-warning'>acceso denegado</p>"
            alert("Debes iniciar sesión para acceder a esta página.");
            // window.location.href = "/login.html"; // o "/PageFormLogin"
        }
        return;
    }

    // Rutas por defecto (ej: Home o ShoppingCard que no requieren validación)
    if (rutasDefault.includes(paginaActiva)) {
        rutas[paginaActiva](); // Ejecutar ruta por defecto
        return;
    }

    // Ruta desconocida
    console.warn(`Ruta no reconocida para el ID: ${paginaActiva}`);
    return
}
