import { createContext, Reducer, useReducer } from "react";
import { useFetch } from "../hooks/useFetch";
import { ControlProps, RequestFilter, ResponseResult } from "../interfaces/globales/global";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { Usuario, UsuarioCambioClave } from "../interfaces/entidades/usuario";
import { getParamsUrlToString } from "../hooks/useUtils";
import { Login } from "../interfaces/globales/auth";

export interface UsuarioContextState<T> extends GlobalContextState<T> {
    obtener: (item: Login) => Promise<ResponseResult<Login>>,
    porCodigo: (item: string) => Promise<ResponseResult<Usuario>>,
    cambiarClave: (item: UsuarioCambioClave) => Promise<ResponseResult<Usuario>>,
}

export const UsuariosContext = createContext<UsuarioContextState<Usuario>>({} as UsuarioContextState<Usuario>)

function UsuariosProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Usuario>, ACTIONTYPES<Usuario>>>(reducer, initialState);
    const api = useFetch();

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            codigo: null,
            acceso: null,
            creadoEn: null,
            rol: null,
            cambio: false,
            activo: true,
        });
    }

    const editar = async (item: Usuario): Promise<void> => {
        dispatch({ type: ACTIONS.EDITING, model: item });
    }

    const agregar = async (item: Usuario): Promise<ResponseResult<Usuario>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Post<Usuario>('usuarios', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE, model: null, reload: true });
        return resp;
    }

    const actualizar = async (item: Usuario): Promise<ResponseResult<Usuario>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Put<Usuario>('usuarios', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE, model: null, reload: true });
        return resp;
    }

    const todos = async (filtro: RequestFilter | null | undefined): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Usuario[]>(`usuarios${getParamsUrlToString(filtro)}`);
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Usuario[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Usuario>(), paginacion: initialState.paginacion});
        }
    }

    const porCodigo = async (codigo: string): Promise<ResponseResult<Usuario>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Usuario>(`usuarios/${codigo}`);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    const obtener = async (item: Login): Promise<ResponseResult<Login>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Post<Login>('usuarios/obtener', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    const cambiarClave = async (item: UsuarioCambioClave): Promise<ResponseResult<Usuario>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Post<Usuario>('usuarios/cambiarClave', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE, model: null, reload: true });
        return resp;
    }

    const cancelar = async () => {
        dispatch({ type: ACTIONS.CANCEL });
    }

    return (
        <UsuariosContext.Provider value={{
            state,
            nuevo,
            editar,
            agregar,
            actualizar,
            cancelar,
            todos,
            obtener,
            cambiarClave,
            porCodigo
        }}>
            {children}
        </UsuariosContext.Provider>
    )
}
export default UsuariosProvider;