import { createContext, Reducer, useReducer } from "react";
import { useFetch } from "../hooks/useFetch";
import { ControlProps, RequestFilter, ResponseResult } from "../interfaces/globales/global";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { getParamsUrlToString } from "../hooks/useUtils";
import { Persona } from "../interfaces/entidades/persona";

export interface PropietarioContextState<T> extends GlobalContextState<T> {
    porCodigo: (codigo: string) => Promise<ResponseResult<Persona>>,
}

export const PropietariosContext = createContext<PropietarioContextState<Persona>>({} as PropietarioContextState<Persona>)

function PropietariosProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Persona>, ACTIONTYPES<Persona>>>(reducer, initialState);
    const api = useFetch();

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            codigo: null,
            nombre: null,
            documento: null,
            esCedula: true,
            licencia: null,
            direccion: null,
            municipio: null,
            telefono1: null,
            telefono2: null,
            correo: null,
            usuario: null,
            foto: null
        });
    }

    const editar = async (item: Persona): Promise<void> => {
        dispatch({ type: ACTIONS.EDITING, model: item });
    }

    const agregar = async (item: Persona): Promise<ResponseResult<Persona>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Post<Persona>('propietarios', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE, model: null, reload: true });
        return resp;
    }

    const actualizar = async (item: Persona): Promise<ResponseResult<Persona>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Put<Persona>('propietarios', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE, model: null, reload: true });
        return resp;
    }

    const todos = async (filtro: RequestFilter | null | undefined): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Persona[]>(`propietarios${getParamsUrlToString(filtro)}`);
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Persona[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Persona>(), paginacion: initialState.paginacion });
        }
    }

    const porCodigo = async (codigo: string): Promise<ResponseResult<Persona>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Persona>(`propietarios/${codigo}`);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    const cancelar = async () => {
        dispatch({ type: ACTIONS.CANCEL });
    }

    return (
        <PropietariosContext.Provider value={{
            state,
            nuevo,
            editar,
            agregar,
            actualizar,
            cancelar,
            todos,
            porCodigo,
        }}>
            {children}
        </PropietariosContext.Provider>
    )
}
export default PropietariosProvider;