import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { rutas } from "./rutas";
import { Confirmacion } from "../hooks/useMensaje";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useData } from "../hooks/useData";

const FooterApp = () => {
    const { contextAuth: { state: { user, isLogged }, getUser, LoggedOut } } = useData();
    const nav = useNavigate();

    return (
        <Container fluid={true} className="bg-black p-5">
            <Container>
                <Row>
                    <Col md={6}>
                        <div className="d-flex flex-column text-white opacity-75">
                            <h1 className="fs-1 fw-bolder">La Manguera Car</h1>
                            <h1 className="fs-6 fw-bolder">Copyright © 2024</h1>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="d-flex flex-column">
                            <Navbar bg="transparent py-1" data-bs-theme="dark">
                                <Container>
                                    <Nav className="ms-auto">
                                        <Nav.Link className="fs-6 text-white" href={`${rutas.Home}`}>Inicio</Nav.Link>
                                        {
                                            !isLogged
                                                ?
                                                <>
                                                    <Nav.Link href={`/${rutas.Vehiculos.Disponibles.replace('/:filtro', '')}`} className="fs-6 text-white">Modelos de Veh&iacute;culo</Nav.Link>
                                                    <Nav.Link href={`/${rutas.Contacto}`} className="fs-6 text-white">Contacto</Nav.Link>
                                                    <Nav.Link className="fs-6 text-white" onClick={() => nav(`/${rutas.Login}`)}>Iniciar Sesi&oacute;n</Nav.Link>
                                                </>
                                                :
                                                <>
                                                    <Nav.Link href={`/${rutas.Vehiculos.PorPropietario.replace(':codigo', user?.propietario?.codigo || '')}`} className="fs-6 text-white">
                                                        Vehiculos
                                                    </Nav.Link>
                                                    <Nav.Link href={`/${rutas.Alquileres.PorPropietario.replace(':codigo', user?.propietario?.codigo || '')}`} className="fs-6 text-white">
                                                        Alquileres
                                                    </Nav.Link>
                                                    <Nav.Link href={`/${rutas.Propietarios.Perfil.replace(':codigo', user?.propietario?.codigo || '')}`} className="fs-6 text-white align-self-center">Mi Perf&iacute;l</Nav.Link>
                                                    <Nav.Link className="fs-6 text-white align-self-center" onClick={async () => {
                                                        await Confirmacion('Esta seguro(a) que desea cerrar la sesión?')
                                                            .then((resp) => {
                                                                if (resp) {
                                                                    LoggedOut();
                                                                    getUser();
                                                                    nav(`/${rutas.Home}`);
                                                                }
                                                            })
                                                    }}>
                                                        <IoExitOutline className="me-1 fs-4" />
                                                        Salir
                                                    </Nav.Link>
                                                </>
                                        }
                                    </Nav>
                                </Container>
                            </Navbar>
                            <Navbar bg="transparent py-0" data-bs-theme="dark">
                                <Container>
                                    <Nav className="ms-auto">
                                        <Nav.Item className="fs-6 text-white">809-555-1234</Nav.Item>
                                        <Nav.Item className="fs-6 text-white px-2">
                                            <div className="vr h-100 bg-white"></div>
                                        </Nav.Item>
                                        <Nav.Item className="fs-6 text-white">lamangueracar@correo.com</Nav.Item>
                                    </Nav>
                                </Container>
                            </Navbar>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}
export default FooterApp;
