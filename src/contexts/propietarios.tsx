import { createContext, Reducer, useReducer } from "react";
import { useFetch } from "../hooks/useFetch";
import { ControlProps, RequestFilter, ResponseResult } from "../interfaces/globales/global";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { getParamsUrlToString } from "../hooks/useUtils";
import { Propietario } from "../interfaces/entidades/propietario";

export interface PropietarioContextState<T> extends GlobalContextState<T> {
    porCodigo: (codigo: string) => Promise<ResponseResult<Propietario>>,
}

export const PropietariosContext = createContext<PropietarioContextState<Propietario>>({} as PropietarioContextState<Propietario>)

function PropietariosProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Propietario>, ACTIONTYPES<Propietario>>>(reducer, initialState);
    const api = useFetch();

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            codigo: null,
            nombre: null,
            cedula: null,
            direccion: null,
            municipio: null,
            telefono1: null,
            telefono2: null,
            correo: null,
        });
    }

    const editar = async (item: Propietario): Promise<void> => {
        dispatch({ type: ACTIONS.EDITING, model: item });
    }

    const agregar = async (item: Propietario): Promise<ResponseResult<Propietario>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Post<Propietario>('propietarios', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE, model: null, reload: true });
        return resp;
    }

    const actualizar = async (item: Propietario): Promise<ResponseResult<Propietario>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Put<Propietario>('propietarios', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE, model: null, reload: true });
        return resp;
    }

    const todos = async (filtro: RequestFilter | null | undefined): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Propietario[]>(`propietarios${getParamsUrlToString(filtro)}`);
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Propietario[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Propietario>(), paginacion: initialState.paginacion });
        }
    }

    const porCodigo = async (codigo: string): Promise<ResponseResult<Propietario>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Propietario>(`propietarios/${codigo}`);
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