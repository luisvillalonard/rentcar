import { Propietario } from "../entidades/propietario";
import { Rol } from "../entidades/rol";

export interface Login {
    usuario: string | null,
    clave: string | null,
    recuerdame: boolean
}

export interface User {
    id: number,
    acceso: string | null,
    rol: Rol | null,
    propietario: Propietario | null,
    token: string | null,
}