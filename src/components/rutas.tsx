import { Route, Routes } from "react-router"
import UsuariosPage from "../pages/usuarios/page"
import PageNotFound from "../pages/notFound"
import HomePage from "../pages/home"
import ContactoPage from "../pages/contacto"
import RegistroPropietarioPage from "../pages/propietarios/registro"
import VehiculoPage from "../pages/vehiculos/registro"
import VehiculosListaPage from "../pages/vehiculos/lista"
import LoginPage from "../pages/login"
import PropietarioPerfilPage from "../pages/propietarios/perfil"
import AlquilerRegistroPage from "../pages/alquiler/registro"
import AlquileresListaPage from "../pages/alquiler/lista"
import VehiculosDisponblesPage from "../pages/vehiculos/disponibles"
import MensajesPage from "../pages/mensajes/page"
import ConfirmacionRegistroPage from "../pages/usuarios/confirmacion"
import CambioClavePage from "../pages/usuarios/cambio"

export const rutas = {
    Home: '/',
    Login: 'login',
    Propietarios: {
        Todos: 'propietarios',
        Registro: 'propietarios/registro',
        Perfil: 'propietario/perfil/:codigo'
    },
    Vehiculos: {
        Todos: 'vehiculos',
        Registro: 'vehiculos/registro',
        PorCodigo: 'vehiculos/:codigo',
        PorPropietario: 'vehiculos/propietario/:codigo',
        Disponibles: 'vehiculos/disponibles',
        DisponiblesConFiltro: 'vehiculos/disponibles/:filtro'
    },
    Alquileres: {
        Todos: 'alquileres',
        Registro: 'alquileres/registro/:codigo',
        PorPropietario: 'alquileres/propietario/:codigo',
    },
    Contacto: 'contacto',
    Mensajes: {
        Todos: 'mensajes',
        PorPropietario: 'mensajes/:codigo'
    },
    Usuarios: {
        Todos: 'usuarios',
        RegistroConfirmacion: 'usuarios/confirmacion/:codigo',
        CambioClave: 'usuarios/cambioclave'
    }
}

const RutasApp = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path={`/${rutas.Login}`} element={<LoginPage />} />

            {/* Propietarios */}
            <Route path={`/${rutas.Propietarios.Registro}`} element={<RegistroPropietarioPage />} />
            <Route path={`/${rutas.Propietarios.Perfil}`} element={<PropietarioPerfilPage />} />

            {/* Vehiculos */}
            <Route path={`/${rutas.Vehiculos.Registro}`} element={<VehiculoPage />} />
            <Route path={`/${rutas.Vehiculos.Todos}`} element={<VehiculosListaPage />} />
            <Route path={`/${rutas.Vehiculos.PorPropietario}`} element={<VehiculosListaPage />} />
            <Route path={`/${rutas.Vehiculos.Disponibles}`} element={<VehiculosDisponblesPage />} />
            <Route path={`/${rutas.Vehiculos.DisponiblesConFiltro}`} element={<VehiculosDisponblesPage />} />

            {/* Alquileres */}
            <Route path={`/${rutas.Alquileres.Registro}`} element={<AlquilerRegistroPage />} />
            <Route path={`/${rutas.Alquileres.Todos}`} element={<AlquileresListaPage />} />
            <Route path={`/${rutas.Alquileres.PorPropietario}`} element={<AlquileresListaPage />} />

            {/* Mensajes */}
            <Route path={`/${rutas.Mensajes.Todos}`} element={<MensajesPage />} />
            <Route path={`/${rutas.Mensajes.PorPropietario}`} element={<MensajesPage />} />

            {/* Usuarios */}
            <Route path={`/${rutas.Usuarios.Todos}`} element={<UsuariosPage />} />
            <Route path={`/${rutas.Usuarios.RegistroConfirmacion}`} element={<ConfirmacionRegistroPage />} />
            <Route path={`/${rutas.Usuarios.CambioClave}`} element={<CambioClavePage />} />

            {/* Otros */}
            <Route path={`/${rutas.Contacto}`} element={<ContactoPage />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}
export default RutasApp;
