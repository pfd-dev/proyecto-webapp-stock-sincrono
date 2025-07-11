export interface IUsuario {
    id: number;
    nombre: string;
    contrasenia?: string;
}

export interface IProducto {
    id: number;
    nombre: string;
    precio: number;
    cantidad?: number;
    categoria?: string;
    descripcion?: string;
    imagen?: string | null;
    pronocion?: boolean;
}