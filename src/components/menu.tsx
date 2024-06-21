import { Nav } from "react-bootstrap";
import { useData } from "../hooks/useData";
import { useNavigate } from "react-router";
import { rutas } from "./rutas";
import { Confirmacion } from "../hooks/useMensaje";
import { IoExitOutline } from "react-icons/io5";

const MenuApp = () => {
    const { contextAuth: { state: { user, isLogged }, getUser, LoggedOut } } = useData();
    const nav = useNavigate();

    const navUrl = (url: string | null | undefined) => {
        if (!url) {
            return;
        }
        nav(url, { replace: true });
    }

    return (
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
                        {
                            user?.rol?.administrador
                                ?
                                <>
                                    <Nav.Link onClick={() => navUrl(`/${rutas.Vehiculos.Todos}`)} className="fs-6 text-white">
                                        Vehiculos
                                    </Nav.Link>
                                    <Nav.Link onClick={() => navUrl(`/${rutas.Alquileres.Todos}`)} className="fs-6 text-white">
                                        Alquileres
                                    </Nav.Link>
                                    <Nav.Link onClick={() => navUrl(`/${rutas.Propietarios.Perfil.replace(':codigo', user.codigo || '')}`)} className="fs-6 text-white align-self-center">Mi Perf&iacute;l</Nav.Link>
                                    <Nav.Link onClick={() => navUrl(`/${rutas.Mensajes.Todos}`)} className="fs-6 text-white align-self-center">Mensajes</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link onClick={() => navUrl(`/${rutas.Vehiculos.PorPropietario.replace(':codigo', user?.persona?.codigo || '')}`)} className="fs-6 text-white">
                                        Vehiculos
                                    </Nav.Link>
                                    <Nav.Link onClick={() => navUrl(`/${rutas.Alquileres.PorPropietario.replace(':codigo', user?.persona?.codigo || '')}`)} className="fs-6 text-white">
                                        Alquileres
                                    </Nav.Link>
                                    <Nav.Link onClick={() => navUrl(`/${rutas.Propietarios.Perfil.replace(':codigo', user?.persona?.codigo || '')}`)} className="fs-6 text-white align-self-center">Mi Perf&iacute;l</Nav.Link>
                                    <Nav.Link onClick={() => navUrl(`/${rutas.Mensajes.PorPropietario.replace(':codigo', user?.persona?.codigo || '')}`)} className="fs-6 text-white align-self-center">Mensajes</Nav.Link>
                                </>
                        }
                        <Nav.Link onClick={() => navUrl(`/${rutas.Contacto}`)} className="fs-6 text-white">Contacto</Nav.Link>
                        <Nav.Link onClick={() => navUrl(`/${rutas.Usuarios.CambioClave}`)} className="fs-6 text-white">Cambiar Clave</Nav.Link>
                        <Nav.Link className="fs-6 text-white align-self-center" onClick={async () => {
                            await Confirmacion('Esta seguro(a) que desea cerrar la sesión?')
                                .then((resp) => {
                                    if (resp) {
                                        LoggedOut();
                                        getUser();
                                        navUrl(`${rutas.Home}`);
                                    }
                                })
                        }}>
                            <IoExitOutline className="me-1 fs-4" />
                            Salir
                        </Nav.Link>
                    </>
            }
        </Nav>
    )
}
export default MenuApp;
