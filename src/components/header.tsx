import { Container, Nav, Navbar } from "react-bootstrap";
import { useData } from "../hooks/useData";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { IoExitOutline } from 'react-icons/io5';
import { Confirmacion } from "../hooks/useMensaje";
import { rutas } from "./rutas";
import { BsList } from "react-icons/bs";

const HeaderApp = () => {
    const { contextAuth: { state: { user, isLogged }, getUser, LoggedOut } } = useData();
    const url = useLocation();
    const nav = useNavigate();

    const navUrl = (url: string | null | undefined) => {
        if (!url) {
            return;
        }
        nav(url);
    }

    useEffect(() => {
        getUser();
    }, [url.pathname])

    return (
        <Container fluid={true} className="p-0">
            <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand className="text-white">La Manguera Car</Navbar.Brand>
                    <Navbar.Toggle aria-controls="menu-colapsable" className="btn btn-sm text-white">
                        <BsList className="fs-2 text-white" />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="menu-colapsable">
                        <Nav className="ms-auto">
                            <Nav.Link className="fs-6 text-white" onClick={() => navUrl(`${rutas.Home}`)}>Inicio</Nav.Link>
                            {
                                !isLogged
                                    ?
                                    <>
                                        <Nav.Link onClick={() => navUrl(`/${rutas.Vehiculos.Disponibles.replace('/:filtro', '')}`)} className="fs-6 text-white">Modelos de Veh&iacute;culo</Nav.Link>
                                        <Nav.Link onClick={() => navUrl(`/${rutas.Contacto}`)} className="fs-6 text-white">Contacto</Nav.Link>
                                        <Nav.Link className="fs-6 text-white" onClick={() => navUrl(`/${rutas.Login}`)}>Iniciar Sesi&oacute;n</Nav.Link>
                                    </>
                                    :
                                    <>
                                        <Nav.Link onClick={() => navUrl(`/${rutas.Vehiculos.PorPropietario.replace(':codigo', user?.propietario?.codigo || '')}`)} className="fs-6 text-white">
                                            Vehiculos
                                        </Nav.Link>
                                        <Nav.Link onClick={() => navUrl(`/${rutas.Alquileres.PorPropietario.replace(':codigo', user?.propietario?.codigo || '')}`)} className="fs-6 text-white">
                                            Alquileres
                                        </Nav.Link>
                                        <Nav.Link onClick={() => navUrl(`/${rutas.Propietarios.Perfil.replace(':codigo', user?.propietario?.codigo || '')}`)} className="fs-6 text-white align-self-center">Mi Perf&iacute;l</Nav.Link>
                                        <Nav.Link onClick={() => navUrl(`/${rutas.Contacto}`)} className="fs-6 text-white">Contacto</Nav.Link>
                                        <Nav.Link className="fs-6 text-white align-self-center" onClick={async () => {
                                            await Confirmacion('Esta seguro(a) que desea cerrar la sesión?')
                                                .then((resp) => {
                                                    if (resp) {
                                                        LoggedOut();
                                                        getUser();
                                                        navUrl(`${rutas.Home}`);
                                                        window.location.reload();
                                                    }
                                                })
                                        }}>
                                            <IoExitOutline className="me-1 fs-4" />
                                            Salir
                                        </Nav.Link>
                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    )
}
export default HeaderApp;
