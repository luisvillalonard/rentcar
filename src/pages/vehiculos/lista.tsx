import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useData } from "../../hooks/useData";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import Loading from "../../components/loading";
import VehiculoDetalle from "./vehiculo";
import { rutas } from "../../components/rutas";

const VehiculosListaPage = () => {
    const {
        contextAuth: { state: { user } },
        contextVehiculos: { state, todos, porPropietario }
    } = useData()
    const { datos, procesando } = state;
    const nav = useNavigate();
    const url = useLocation();
    const { codigo } = useParams();

    const cargarVehiculos = async () => {
        if (codigo) {
            porPropietario && await porPropietario(codigo)
        } else {
            todos && await todos(null);
        }
    }

    useEffect(() => {
        cargarVehiculos();
    }, [url.pathname])

    return (
        <>
            <Container className="py-4">
                <Col lg={10} md={10} xs={12} className="mx-auto">
                    <Row>
                        <Col md xs className="align-self-center mb-3">
                            <h1 className="fs-2 fw-light m-0">
                                {
                                    user?.persona
                                        ? 'Mis Vehículos'
                                        : 'Lista de Vehículos'
                                }
                            </h1>
                        </Col>
                        {
                            user?.rol?.propietario
                                ?
                                <Col md="auto" xs="auto" className="align-self-center mb-3">
                                    <Button variant="primary" className="rounded-pill" onClick={() => nav(`/${rutas.Vehiculos.Registro}`)}>Registrar Nuevo</Button>
                                </Col>
                                : <></>
                        }
                    </Row>

                    <hr className="mt-3 mb-4 pb-1" />
                    <Row>
                        {
                            datos && datos.map(item => {
                                return (
                                    <VehiculoDetalle key={item.codigo} Item={item} Alquilar={false} />
                                )
                            })
                        }
                    </Row>
                </Col>
            </Container>
            <Loading Visible={procesando} Mensaje="Cargando vehículos, espere..." />
        </>
    )
}
export default VehiculosListaPage;
