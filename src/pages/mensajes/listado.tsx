import { Badge, Col, Container, Table } from "react-bootstrap"
import { useData } from "../../hooks/useData";
import { FormatDate_DDMMYYYY } from "../../hooks/useUtils";
import { useEffect } from "react";

const MensajesListado = () => {
    const { contextMensajes: { state: { datos: mensajes, recargar }, todos, editar } } = useData();

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
        <Table responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {
                    mensajes && mensajes.length === 0
                        ? <tr><td colSpan={4}>0 mensajes</td></tr>
                        : mensajes && mensajes.map(mensaje => {
                            return <tr key={mensaje.id}>
                                <td>{mensaje.nombre}</td>
                                <td>{mensaje.correo}</td>
                                <td>{FormatDate_DDMMYYYY(mensaje.fecha)}</td>
                                <td>
                                    {
                                        mensaje.contestado
                                            ? <Badge bg="warning">Pendiente</Badge>
                                            : <Badge bg="success">Contestado</Badge>
                                    }
                                </td>
                            </tr>
                        })
                }
            </tbody>
        </Table>
    )
}
export default MensajesListado;
