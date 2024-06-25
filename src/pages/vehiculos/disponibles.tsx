import { ChangeEvent, useEffect, useState } from "react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap"
import { decrypt } from "../../hooks/useUtils";
import { useData } from "../../hooks/useData";
import { useLocation, useParams } from "react-router";
import { Vehiculo } from "../../interfaces/entidades/vehiculo";
import VehiculoAlquiler from "./vehiculo";
import Loading from "../../components/loading";
import { Alquiler, AlquilerFiltro } from "../../interfaces/entidades/alquiler";
import { useForm } from "../../hooks/useForm";

const VehiculosDisponblesPage = () => {
    const {
        contextVehiculos: { state: { procesando }, disponibles },
        contextMarcas: { state: { datos: marcas, procesando: cargandoMarcas }, todos: cargarMarcas },
        contextModelos: { state: { datos: modelos, procesando: cargandoModelos }, todos: cargarModelos },
        contextCombustibles: { state: { datos: combustibles, procesando: cargandoCombustibles }, todos: cargarCombustibles },
    } = useData();
    const [vehiculos, setVehiculos] = useState<Vehiculo[] | null>([]);
    const { entidad: filtros, editar, handleChangeInput } = useForm<AlquilerFiltro>({ marcaId: 0, modeloId: 0, combustibleId: 0, fechaInicio: '', fechaFin: '' });
    const { filtro } = useParams();
    const url = useLocation();

    const buscar = async (filtro: AlquilerFiltro) => {
        const resp = await disponibles(filtro)
        if (resp && resp.ok) {
            setVehiculos(resp.datos);
        } else {
            setVehiculos([]);
        }
    }

    useEffect(() => {
        let params: AlquilerFiltro = {
            marcaId: 0,
            modeloId: 0,
            combustibleId: 0,
            fechaInicio: '',
            fechaFin: ''
        } as AlquilerFiltro;

        if (filtro) {
            const decryptText = decrypt(filtro?.replaceAll('&', '/'));
            if (decryptText) {
                const entries = Object.fromEntries(new URLSearchParams(decryptText.slice(1, decryptText.length - 1)))
                const urlParams = new URLSearchParams(decryptText.slice(1, decryptText.length - 1))
                const marcaId = urlParams.get('marcaId') as string
                const modeloId = urlParams.get('modeloId') as string
                const combustibleId = urlParams.get('combustibleId') as string
                const fechaInicio = urlParams.get('fechaInicio') as string
                const fechaFin = urlParams.get('fechaFin') as string

                if (entries) {
                    params = {
                        marcaId: parseInt(marcaId),
                        modeloId: parseInt(modeloId),
                        combustibleId: parseInt(combustibleId),
                        fechaInicio: fechaInicio,
                        fechaFin: fechaFin
                    }
                    editar(params);
                    buscar(params);
                }
            }
        } else {
            buscar(params);
        }

        (async () => {
            cargarMarcas && await cargarMarcas(null);
            cargarModelos && await cargarModelos(null);
            cargarCombustibles && await cargarCombustibles(null);
        })()
    }, [url.pathname])

    return (
        <>
            <Container className="mt-4 mb-3">
                <Row>
                    <Col lg={9} md={9} className="mb-4">
                        <h1 className="fs-2 fw-lighter mb-4">Vehículos Disponibles</h1>
                        <Row>
                            {vehiculos && vehiculos.map(vehiculo => <VehiculoAlquiler key={vehiculo.codigo} Item={vehiculo} Alquilar={true} />)}
                        </Row>
                    </Col>
                    <Col lg={3} md={3}>
                        <Card className="rounded shadow-sm mb-4">
                            <Card.Header className="bg-transparent border-top border-bottom-0 border-4 border-primary rounded-top py-1">
                                <Card.Title className="m-0">Per&iacute;odo Reserva</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col className="mb-3">
                                        <Form.Label className="fw-bolder mb-1">Inicio</Form.Label>
                                        <Form.Control
                                            id="fechaInicio"
                                            name="fechaInicio"
                                            type="date"
                                            value={filtros.fechaInicio || ''}
                                            className="border-0 border-bottom rounded-0 py-0"
                                            onChange={handleChangeInput} />
                                    </Col>
                                    <Col>
                                        <Form.Label className="fw-bolder mb-1">F&iacute;n</Form.Label>
                                        <Form.Control
                                            id="fechaFin"
                                            name="fechaFin"
                                            type="date"
                                            value={filtros.fechaFin || ''}
                                            className="border-0 border-bottom rounded-0 py-0"
                                            onChange={handleChangeInput} />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        <Card className="rounded shadow-sm mb-4">
                            <Card.Header className="bg-transparent border-top border-bottom-0 border-4 border-primary rounded-top py-1">
                                <Card.Title className="m-0">Marca y Modelo</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form.Select
                                    id="marcaId"
                                    name="marcaId"
                                    className="border-0 border-bottom rounded-0 mb-3"
                                    value={filtros.marcaId || 0}
                                    onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                        editar({ ...filtros, marcaId: parseInt(evt.target.value) });
                                    }}>
                                    <option value="">Todas</option>
                                    {marcas.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
                                </Form.Select>
                                <Form.Select
                                    id="modelo"
                                    name="modeloId"
                                    className="border-0 border-bottom rounded-0"
                                    value={filtros.modeloId || 0}
                                    onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                        editar({ ...filtros, modeloId: parseInt(evt.target.value) });
                                    }}>
                                    <option value="">Todos</option>
                                    {
                                        modelos
                                            .filter(item => item.marca.id === filtros.marcaId)
                                            .map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)
                                    }
                                </Form.Select>
                            </Card.Body>
                        </Card>

                        <Card className="rounded shadow-sm mb-4">
                            <Card.Header className="bg-transparent border-top border-bottom-0 border-4 border-primary rounded-top py-1">
                                <Card.Title className="m-0">Combustible</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form.Select
                                    id="combustible"
                                    className="border-0 border-bottom"
                                    onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                        editar({ ...filtros, combustibleId: parseInt(evt.target.value) });
                                    }}>
                                    <option value="">Todos</option>
                                    {combustibles.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
                                </Form.Select>
                            </Card.Body>
                        </Card>


                        <Button variant="primary" className="w-100" onClick={() => buscar(filtros)}>Buscar</Button>

                    </Col>
                </Row>
            </Container>
            <Loading Visible={procesando} Mensaje="procesando, espere..." />
        </>
    )
}
export default VehiculosDisponblesPage;
