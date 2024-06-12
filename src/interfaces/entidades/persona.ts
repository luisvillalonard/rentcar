import { Municipio } from "./municipio";
import { Provincia } from "./provincia";

export interface Persona {
    id: number,
    esCedula: boolean,
    documento: string | null,
    nombre: string | null,
    licencia: string | null,
    provincia: Provincia | null,
    municipio: Municipio | null,
    direccion: string | null,
    telefono1: string | null,
    telefono2: string | null,
}