import { Provincia } from "./provincia";

export interface Municipio {
    id: number,
    nombre: string | null,
    provincia: Provincia | null
}