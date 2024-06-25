import { Button, ButtonGroup, Card, Table } from "react-bootstrap"
import { CiEdit } from 'react-icons/ci';
import { GoShieldCheck, GoShieldX } from 'react-icons/go';
import { useData } from "../../hooks/useData";
import { FormatDate_DDMMYYYY } from "../../hooks/useUtils";
import Estado from "../../components/estado";
import { useEffect } from "react";
import { Alerta, Confirmacion, Exito } from "../../hooks/useMensaje";

const UsuariosListado = () => {
    const { contextUsuarios: { state: { datos, recargar }, todos, editar, actualizar } } = useData();

    const Cargar = async () => {
        if (todos) {
            await todos(null);
        }
    }

    useEffect(() => {
        Cargar();
    }, [])

    useEffect(() => {
        if (recargar) {
            Cargar();
        }
    }, [recargar])

    return (
        <Table responsive hover>
            <thead>
                <tr>
                    <th>Acceso</th>
                    <th>Tipo</th>
                    <th>Creado En</th>
                    <th className="text-center">Cambio Clave</th>
                    <th className="text-center">Activo</th>
                    <th className="text-center">Acci&oacute;n</th>
                </tr>
            </thead>
            <tbody>
                {
                    datos && datos.length === 0 ?
                        <tr>
                            <td colSpan={6}>0 usuarios registrados</td>
                        </tr>
                        :
                        datos.map((item, pos) => {
                            return <tr key={pos}>
                                <td className="align-middle">{item.acceso}</td>
                                <td className="align-middle">{item.rol?.nombre}</td>
                                <td className="align-middle text-center">
                                    {FormatDate_DDMMYYYY(item.creadoEn)}
                                </td>
                                <td className="align-middle text-center">
                                    <Estado valor={item.cambio} textoPositivo="Si" textoNegativo="No" />
                                </td>
                                <td className="align-middle text-center">
                                    <Estado valor={item.activo} />
                                </td>
                                <td>
                                    <ButtonGroup size="sm">
                                        <Button variant="outline-secondary" className="border-0" title="Editar Acceso"
                                            onClick={() => editar && editar(item)}>
                                            <CiEdit className="fs-3" />
                                        </Button>
                                        <Button variant={`outline-${item.activo ? 'danger' : 'success'}`} className="border-0" title={`${item.activo ? 'Inactivar' : 'Activar'}`} onClick={async () => {
                                            await Confirmacion(`Esta seguro(a) que desea cerrar ${item.activo ? 'INACTIVAR' : 'ACTIVAR'} este usuario?`)
                                                .then(async (resp) => {
                                                    if (resp) {
                                                        if (actualizar) {

                                                            const resp = await actualizar({
                                                                ...item,
                                                                activo: !item.activo
                                                            });
                                                            if (resp) {
                                                                if (resp.ok) {
                                                                    Exito('El usuario cambio de estado exitosamente!')
                                                                    Cargar();
                                                                } else {
                                                                    Alerta(resp.mensaje || 'Situación inesperada tratando de cambiar el estado al usuario.');
                                                                }
                                                            }
                                                        }
                                                    }
                                                })
                                        }}>
                                            {
                                                item.activo
                                                ? <GoShieldCheck className="fs-3" />
                                                : <GoShieldX className="fs-3" />
                                            }
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        })

                }
            </tbody>
        </Table>
    )
}
export default UsuariosListado;
