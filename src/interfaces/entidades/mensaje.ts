export interface Mensaje {
    id: number,
    mensajeId: number | null,
    nombre: string | null,
    correo: string | null,
    comentario: string | null,
    fecha: string | null,
    contestado: boolean
}