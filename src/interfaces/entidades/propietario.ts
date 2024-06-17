import { Municipio } from "./municipio";
import { Usuario } from "./usuario";

export interface Propietario {
    id: number,
    codigo: string | null,
    nombre: string | null,
    cedula: string | null,
    direccion: string | null,
    municipio: Municipio | null,
    telefono1: string | null,
    telefono2: string | null,
    correo: string | null,
    usuario: Usuario | null
}
