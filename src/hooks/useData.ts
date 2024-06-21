import { useContext } from "react";
import MarcasProvider, { MarcasContext } from "../contexts/marcas";
import { GlobalContextState } from "../reducers/global";
import { Marca } from "../interfaces/entidades/marca";
import { Providers } from "../components/providers";
import { AuthContext, AuthProvider, AuthReducerState } from "../contexts/auth";
import UsuariosProvider, { UsuarioContextState, UsuariosContext } from "../contexts/usuarios";
import { Usuario } from "../interfaces/entidades/usuario";
import RolesProvider, { RolesContext } from "../contexts/roles";
import { Rol } from "../interfaces/entidades/rol";
import { Persona } from "../interfaces/entidades/persona";
import PropietariosProvider, { PropietarioContextState, PropietariosContext } from "../contexts/propietarios";
import ProvinciasProvider, { ProvinciasContext } from "../contexts/provincias";
import MunicipiosProvider, { MunicipiosContext } from "../contexts/municipios";
import { Provincia } from "../interfaces/entidades/provincia";
import { Municipio } from "../interfaces/entidades/municipio";
import VehiculosProvider, { VehiculoContextState, VehiculosContext } from "../contexts/vehiculos";
import { Vehiculo } from "../interfaces/entidades/vehiculo";
import VehiculosTiposProvider, { VehiculosTiposContext } from "../contexts/vehiculosTipos";
import { VehiculoTipo } from "../interfaces/entidades/vehiculoTipo";
import { Accesorio } from "../interfaces/entidades/accesorio";
import AccesoriosProvider, { AccesoriosContext } from "../contexts/accesorios";
import CargasProvider, { CargasContext } from "../contexts/cargas";
import { Carga } from "../interfaces/entidades/carga";
import { Color } from "../interfaces/entidades/color";
import ColoresProvider, { ColoresContext } from "../contexts/colores";
import { Combustible } from "../interfaces/entidades/combustible";
import CombustiblesProvider, { CombustiblesContext } from "../contexts/combustibles";
import { Estado } from "../interfaces/entidades/estado";
import EstadosProvider, { EstadosContext } from "../contexts/estados";
import { Modelo } from "../interfaces/entidades/modelo";
import ModelosProvider, { ModelosContext } from "../contexts/modelos";
import { Motor } from "../interfaces/entidades/motor";
import MotoresProvider, { MotoresContext } from "../contexts/motores";
import { Traccion } from "../interfaces/entidades/traccion";
import TraccionesProvider, { TraccionesContext } from "../contexts/tracciones";
import { Transmision } from "../interfaces/entidades/transmision";
import TransmisionesProvider, { TransmisionesContext } from "../contexts/transmisiones";
import { Uso } from "../interfaces/entidades/uso";
import UsosProvider, { UsosContext } from "../contexts/usos";
import ConfiguracionAlquilerNotasProvider, { ConfiguracionAlquilerNotasContext } from "../contexts/configuracionAlquilerNotas";
import { ConfiguracionAlquilerNota } from "../interfaces/entidades/configuracionAlquilerNota";
import AlquilersProvider, { AlquilerContextState, AlquileresContext } from "../contexts/alquileres";
import { Alquiler } from "../interfaces/entidades/alquiler";
import MensajesProvider, { MensajesContext } from "../contexts/mensajes";
import { Mensaje } from "../interfaces/entidades/mensaje";

export const ProvidersTree = Providers([
    /* Login */
    [AuthProvider, {}],

    /* Auxiliares */
    [AccesoriosProvider, {}],
    [CargasProvider, {}],
    [ColoresProvider, {}],
    [CombustiblesProvider, {}],
    [EstadosProvider, {}],
    [MarcasProvider, {}],
    [ModelosProvider, {}],
    [MotoresProvider, {}],
    [MunicipiosProvider, {}],
    [ProvinciasProvider, {}],
    [TraccionesProvider, {}],
    [TransmisionesProvider, {}],
    [RolesProvider, {}],
    [UsosProvider, {}],
    [VehiculosTiposProvider, {}],
    [ConfiguracionAlquilerNotasProvider, {}],

    /* Entidades */
    [UsuariosProvider, {}],
    [PropietariosProvider, {}],
    [VehiculosProvider, {}],
    [AlquilersProvider, {}],
    [MensajesProvider, {}],
]);

export const useData = () => {
    /* Login */
    const contextAuth = useContext(AuthContext) as AuthReducerState;

    /* Auxiliares */
    const contextAccesorios = useContext(AccesoriosContext) as GlobalContextState<Accesorio>;
    const contextCargas = useContext(CargasContext) as GlobalContextState<Carga>;
    const contextColores = useContext(ColoresContext) as GlobalContextState<Color>;
    const contextCombustibles = useContext(CombustiblesContext) as GlobalContextState<Combustible>;
    const contextEstados = useContext(EstadosContext) as GlobalContextState<Estado>;
    const contextMarcas = useContext(MarcasContext) as GlobalContextState<Marca>;
    const contextModelos = useContext(ModelosContext) as GlobalContextState<Modelo>;
    const contextMotores = useContext(MotoresContext) as GlobalContextState<Motor>;
    const contextMunicipios = useContext(MunicipiosContext) as GlobalContextState<Municipio>;
    const contextProvincias = useContext(ProvinciasContext) as GlobalContextState<Provincia>;
    const contextTracciones = useContext(TraccionesContext) as GlobalContextState<Traccion>;
    const contextTransmisiones = useContext(TransmisionesContext) as GlobalContextState<Transmision>;
    const contextRoles = useContext(RolesContext) as GlobalContextState<Rol>;
    const contextUsos = useContext(UsosContext) as GlobalContextState<Uso>;
    const contextVehiculosTipos = useContext(VehiculosTiposContext) as GlobalContextState<VehiculoTipo>;
    const contextConfiguracionAlquilerNotas = useContext(ConfiguracionAlquilerNotasContext) as GlobalContextState<ConfiguracionAlquilerNota>;

    /* Entidades */
    const contextUsuarios = useContext(UsuariosContext) as UsuarioContextState<Usuario>;
    const contextPropietarios = useContext(PropietariosContext) as PropietarioContextState<Persona>;
    const contextVehiculos = useContext(VehiculosContext) as VehiculoContextState<Vehiculo>;
    const contextAlquileres = useContext(AlquileresContext) as AlquilerContextState<Alquiler>;
    const contextMensajes = useContext(MensajesContext) as AlquilerContextState<Mensaje>;

    return {
        /* Login */
        contextAuth,

        /* Auxiliares */
        contextAccesorios,
        contextCargas,
        contextColores,
        contextCombustibles,
        contextEstados,
        contextMarcas,
        contextModelos,
        contextMunicipios,
        contextMotores,
        contextProvincias,
        contextTracciones,
        contextTransmisiones,
        contextRoles,
        contextUsos,
        contextVehiculosTipos,
        contextConfiguracionAlquilerNotas,

        /* Entidades */
        contextUsuarios,
        contextPropietarios,
        contextVehiculos,
        contextAlquileres,
        contextMensajes,
    }

}