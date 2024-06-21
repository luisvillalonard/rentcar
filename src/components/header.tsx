import { Container, Nav, Navbar } from "react-bootstrap";
import { useData } from "../hooks/useData";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { IoExitOutline } from 'react-icons/io5';
import { Confirmacion } from "../hooks/useMensaje";
import { rutas } from "./rutas";
import { BsList } from "react-icons/bs";
import MenuApp from "./menu";

const HeaderApp = () => {
    const { contextAuth: { state: { user, isLogged }, getUser, LoggedOut } } = useData();
    const url = useLocation();
    
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
                        <MenuApp />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    )
}
export default HeaderApp;
