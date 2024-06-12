import { Button, ButtonGroup, Card, Table } from "react-bootstrap"
import { CiEdit } from 'react-icons/ci';
import { GoShieldCheck } from 'react-icons/go';
import { useData } from "../../hooks/useData";
import { FormatDate_DDMMYYYY } from "../../hooks/useUtils";
import Estado from "../../components/estado";
import { useEffect } from "react";

const UsuariosListado = () => {
    const { contextUsuarios: { state: { datos, recargar }, todos, editar } } = useData();

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
        <Card className="">
            <Card.Body>
                <Table>
                    <thead>
                        <tr>
                            <th>Acceso</th>
                            <th>Tipo</th>
                            <th>Creado En</th>
                            <th>Cambio Clave</th>
                            <th>Activo</th>
                            <th>Acci&oacute;n</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datos && datos.length === 0 ?
                                <tr>
                                    <td colSpan={5}>0 usuarios registrados</td>
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
                                                <Button variant="outline-success" className="border-0" title="Activar">
                                                    <GoShieldCheck className="fs-3" />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                })

                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}
export default UsuariosListado;
