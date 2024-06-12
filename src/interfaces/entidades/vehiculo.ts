import { Accesorio } from "./accesorio";
import { Carga } from "./carga";
import { Color } from "./color";
import { Combustible } from "./combustible";
import { Foto } from "./foto";
import { Marca } from "./marca";
import { Modelo } from "./modelo";
import { Motor } from "./motor";
import { Propietario } from "./propietario";
import { Traccion } from "./traccion";
import { Transmision } from "./transmision";
import { VehiculoTipo } from "./vehiculoTipo";

export interface Vehiculo {
    id: number,
    codigo: string | null,
    propietario: Propietario | null,
    tipo: VehiculoTipo | null,
    marca: Marca | null,
    modelo: Modelo | null,
    combustible: Combustible | null,
    transmision: Transmision | null,
    traccion: Traccion | null,
    interior: Color | null,
    exterior: Color | null,
    motor: Motor | null,
    precio: number,
    puertas: number,
    pasajeros: number
    carga: Carga | null,
    uso: number | null,
    enKilometros: boolean,
    enMillas: boolean,
    foto: Foto | null | undefined,
    fotos: Foto[],
    accesorios: Accesorio[]
}