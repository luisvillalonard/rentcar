import { Marca } from "./marca";

export interface Modelo {
    id: number,
    nombre: string | null,
    marca: Marca
}