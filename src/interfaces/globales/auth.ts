import { Persona } from "../entidades/persona";
import { Rol } from "../entidades/rol";

export interface Login {
    usuario: string | null,
    clave: string | null,
    recuerdame: boolean
}

export interface User {
    id: number,
    codigo: string | null,
    acceso: string | null,
    rol: Rol | null,
    persona: Persona | null,
    token: string | null,
}