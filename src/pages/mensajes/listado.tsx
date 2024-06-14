import { Badge, Button, ButtonGroup, Card, Container, Table } from "react-bootstrap"
import { CiEdit } from 'react-icons/ci';
import { GoShieldCheck } from 'react-icons/go';
import { useData } from "../../hooks/useData";
import { FormatDate_DDMMYYYY } from "../../hooks/useUtils";
import Estado from "../../components/estado";
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
                            return <tr>
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
