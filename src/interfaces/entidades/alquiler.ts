import { Foto } from "./foto";
import { Persona } from "./persona";
import { Vehiculo } from "./vehiculo";

export interface Alquiler {
    id: number,
    persona: Persona | null,
    fechaInicio: string | null,
    fechaFin: string | null,
    vehiculo: Vehiculo | null,
    precio: number,
    enEfectivo: boolean,
    efectivo: number,
    comprobante: Foto | null,
    notas: AlquilerNota[] | null,
}

export interface AlquilerNota {
    id: number,
    alquilerId: number,
    nota: string | null
}

export interface AlquilerFiltro {
    marcaId: number | null,
    modeloId: number | null,
    combustibleId: number | null,
    fechaInicio: string | null,
    fechaFin: string | null,
}