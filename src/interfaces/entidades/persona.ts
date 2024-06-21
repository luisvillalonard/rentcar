import { Foto } from "./foto";
import { Municipio } from "./municipio";
import { Usuario } from "./usuario";

export interface    Persona {
    id: number,
    codigo: string | null,
    nombre: string | null,
    documento: string | null,
    esCedula: boolean,
    licencia: string | null,
    direccion: string | null,
    municipio: Municipio | null,
    telefono1: string | null,
    telefono2: string | null,
    correo: string | null,
    usuario: Usuario | null,
    foto: Foto | null,
}