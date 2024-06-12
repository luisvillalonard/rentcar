import Swal from "sweetalert2";

export function Exito(mensaje: string) {
    Swal.fire({
        title: 'Exito!',
        html: `${mensaje}`,
        icon: 'success',
    })
}

export function Alerta(mensaje: string) {
    Swal.fire({
        title: 'Alerta!',
        html: `${mensaje}`,
        icon: 'warning',
    })
}

export function Error(mensaje: string) {
    Swal.fire({
        title: 'Error!',
        html: `${mensaje}`,
        icon: 'error'
    })
}

export function Confirmacion(mensaje: string): Promise<boolean> {
    return Swal.fire({
        title: 'Confirmación!',
        html: `${mensaje}`,
        icon: 'question',
        showDenyButton: false,
        /* Aceptar */
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        /* Cancelar */
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        /* Si presiono aceptar */
        return  result.isConfirmed;
    })
}