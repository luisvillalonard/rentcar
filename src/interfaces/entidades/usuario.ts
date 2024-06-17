import { Rol } from "./rol";

export interface Usuario {
    id: number,
    codigo: string | null,
    acceso: string | null,
    creadoEn: string | null,
    rol: Rol | null,
    cambio: boolean,
    activo: boolean,
}

export interface UsuarioCambioClave {
    id: number,
    passwordNew: string | null | undefined,
    passwordConfirm: string | null | undefined,
}
