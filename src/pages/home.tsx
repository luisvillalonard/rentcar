import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useData } from "../hooks/useData";
import { IoCarSportOutline } from 'react-icons/io5';
import { GiCarKey } from 'react-icons/gi';
import car1 from '../assets/car1.png';
import car2 from '../assets/car2.png';
import { useLocation, useNavigate } from "react-router";
import { ChangeEvent, useEffect } from "react";
import { useForm } from "../hooks/useForm";
import { AlquilerFiltro } from "../interfaces/entidades/alquiler";
import { encrypt } from "../hooks/useUtils";
import { rutas } from "../components/rutas";

const HomePage = () => {

    const {
        contextAuth: { state: { user } },
        contextMarcas: { state: { datos: marcas, procesando: cargandoMarcas }, todos: cargarMarcas },
        contextModelos: { state: { datos: modelos, procesando: cargandoModelos }, todos: cargarModelos },
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<AlquilerFiltro>({ marcaId: 0, modeloId: 0, combustibleId: 0, fechaInicio: '', fechaFin: '' });
    const nav = useNavigate();
    const url = useLocation();

    const buscar = async () => {
        const objectParams: Record<string, any> = entidad;
        const searchParams = new URLSearchParams(objectParams);

        const valor: string = encrypt(searchParams.toString())?.replaceAll('/', '&') ?? '';
        nav(`/${rutas.Vehiculos.DisponiblesConFiltro.replace(':filtro', valor)}`);
    }

    useEffect(() => {
        (async () => {
            cargarMarcas && await cargarMarcas(null);
            cargarModelos && await cargarModelos(null);
        })()
    }, [url.pathname])

    return (
        <div className="d-flex flex-column">
            <div className="home-wrap mb-5">
                <div className="w-100 h-100 position-absolute d-flex overflow-hidden bg-black bg-opacity-50">
                    <Container as={Col} lg={10} className="m-auto text-white">
                        <Row>
                            <Col md={12}>
                                <h1 className="display-3 fw-bolder lh-1 text-center">Alquiler de veh&iacute;culos</h1>
                                <h1 className="display-3 fw-bolder lh-1 text-center mb-4">Flexible para tu gusto</h1>
                                <p className="fs-2 lh-sm text-center mb-5">
                                    Todo tipo de veh&iacute;culo, furgonetas, premium, vehículos.
                                    Adaptado a tus necesidades y más,<br />busca el que necesitas y listo!
                                </p>
                            </Col>
                            <Col lg={3} md={4} className="mb-3">
                                <Form.Label className="fs-5">Marca</Form.Label>
                                <Form.Select
                                    id="marca"
                                    onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                        editar({ ...entidad, marcaId: parseInt(evt.target.value) });
                                    }}>
                                    <option value="">Seleccione</option>
                                    {marcas.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
                                </Form.Select >
                            </Col>
                            <Col lg={3} md={4} className="mb-3">
                                <Form.Label className="fs-5">Modelo</Form.Label>
                                <Form.Select
                                    id="modelo"
                                    onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                        editar({ ...entidad, modeloId: parseInt(evt.target.value) });
                                    }}>
                                    <option value="">Seleccione</option>
                                    {
                                        modelos
                                            .filter(item => item.marca.id === entidad.marcaId)
                                            .map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)
                                    }
                                </Form.Select>
                            </Col>
                            <Col lg={3} md={4} className="mb-md-3 mb-4">
                                <Form.Label className="fs-5">Fecha Recogida</Form.Label>
                                <Form.Control
                                    id="fechaInicio"
                                    name="fechaInicio"
                                    type="date"
                                    onChange={handleChangeInput} />
                            </Col>
                            <Col lg={3} md={4} className="align-self-end mb-3">
                                <Button variant="primary" className="w-100" onClick={buscar}>Buscame un veh&iacute;culo</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <Container className="col-lg-9 col-md-10">
                <Row>
                    <Col md={6} className="mb-5">
                        <img src={car1} alt="" className="w-100 img-fluid" />
                    </Col>
                    <Col md={6} className="mb-5 align-self-center">
                        <Row>
                            <Col md xs>
                                <h1 className="fs-1 fw-light text-primary">Alquila tu veh&iacute;culo</h1>
                            </Col>
                            <Col md="auto" xs="auto">
                                <IoCarSportOutline className="display-3 text-secondary" />
                            </Col>
                            <Col md={12} className="fs-5 mb-4">
                                <hr />
                                Mejora tus ingresos alquilando todos tus vehiculos,
                                sacale el máximo provecho a nuestra plataforma.
                            </Col>
                            <Col>
                                <Button variant="success" className="rounded-pill" onClick={() => nav(`/${rutas.Propietarios.Registro}`)}>Registrame</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6} className="mb-3 align-self-center">
                        <Row>
                            <Col md xs>
                                <h1 className="fs-1 fw-light text-primary">Registrate!</h1>
                            </Col>
                            <Col md="auto" xs="auto">
                                <GiCarKey className="display-3 text-secondary" />
                            </Col>
                            <Col md={12} className="fs-5 mb-4">
                                <hr />
                                Te damos acceso a mejorar tus ingresos, ofreciendo
                                lo que los dem&aacute;s estan buscando. No pierdas m&aacute;s tiempo!.
                            </Col>
                            <Col>
                                <Button variant="success" className="rounded-pill" onClick={() => nav(`/${rutas.Propietarios.Registro}`)}>Registrame</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6} className="mb-5">
                        <img src={car2} alt="" className="w-100 img-fluid" />
                    </Col>
                </Row>
            </Container>
        </div >
    )
}
export default HomePage;
