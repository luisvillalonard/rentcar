import { Badge, Container, Table } from "react-bootstrap";
import { useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import { Alquiler } from "../../interfaces/entidades/alquiler";
import Loading from "../../components/loading";
import { FormatDate_DDMMYYYY, FormatNumber } from "../../hooks/useUtils";

const AlquileresListaPage = () => {
    const {
        contextAuth: { state: { user } },
        contextAlquileres: { state: { procesando }, porPropietario }
    } = useData()
    const [alquileres, setAlquileres] = useState<Alquiler[]>([]);
    const url = useLocation();
    const { codigo } = useParams();

    const cargar = async () => {
        if (codigo) {
            const resp = await porPropietario(codigo)
            if (resp && resp.ok) {
                setAlquileres(resp.datos as Alquiler[])
            } else {
                setAlquileres([])
            }
        }
    }

    useEffect(() => {
        cargar();
    }, [url.pathname])

    return (
        <>
            <Container className="mt-4 mb-3">
                <h1 className="fs-2 fw-lighter mb-4">Histórico de Alquileres</h1>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Color</th>
                            <th>Desde</th>
                            <th>Hasta</th>
                            <th>Precio RD$</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            alquileres && alquileres.length === 0
                                ? <tr><td colSpan={7}>0 alquileres</td></tr>
                                : alquileres && alquileres.map(alquiler => {
                                    const hoy = new Date();
                                    const inicio = new Date(alquiler.fechaInicio as string);
                                    const fin = new Date(alquiler.fechaFin as string);
                                    const dias = (fin.getDate() - inicio.getDate()) + 1;

                                    return <tr>
                                        <td>{alquiler.vehiculo?.modelo?.marca.nombre}</td>
                                        <td>{alquiler.vehiculo?.modelo?.nombre}</td>
                                        <td>{alquiler.vehiculo?.exterior?.nombre || ''}</td>
                                        <td>{FormatDate_DDMMYYYY(alquiler.fechaInicio)}</td>
                                        <td>{FormatDate_DDMMYYYY(alquiler.fechaFin)}</td>
                                        <td>{FormatNumber(alquiler.efectivo, 2)}</td>
                                        <td>
                                            {
                                                inicio > hoy
                                                    ? <Badge pill bg="secondary">Pendiente</Badge>
                                                    : hoy > inicio && hoy < fin
                                                        ? <Badge pill bg="primary">En Curso</Badge>
                                                        : fin < hoy
                                                            ? <Badge pill bg="success">En Curso</Badge>
                                                            : <></>
                                            }
                                        </td>
                                    </tr>
                                })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={5}>{`${alquileres.length} ${alquileres.length === 1 ? 'alquiler' : 'alquileres'}`}</th>
                            <th>{FormatNumber(alquileres.reduce((acc, alq) => { return acc + alq.efectivo; }, 0), 2)}</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </Table>
            </Container>
            <Loading Visible={procesando} Mensaje="procesando, espere..." />
        </>
    )
}
export default AlquileresListaPage;
