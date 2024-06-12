import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useData } from "../../hooks/useData";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import Loading from "../../components/loading";
import VehiculoDetalle from "./vehiculo";

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
            <Container className="mt-4 mb-3">
                <h1 className="fs-2 fw-lighter mb-4">
                    {
                        user?.propietario
                            ? 'Mis Vehículos'
                            : 'Lista de Vehículos'
                    }
                </h1>

                <Card className="shadow-sm mb-4">
                    <Card.Body className="pb-1">
                        <Row>
                            <Col md className="mb-3">
                                <Button variant="primary" className="rounded-pill" onClick={() => nav('/vehiculos/registro')}>Registrar Nuevo</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <Row>
                    {
                        datos && datos.map(item => {
                            return (
                                <VehiculoDetalle key={item.codigo} Item={item} Alquilar={false} />
                            )
                        })
                    }
                </Row>
            </Container>
            <Loading Visible={procesando} Mensaje="Cargando vehículos, espere..." />
        </>
    )
}
export default VehiculosListaPage;
