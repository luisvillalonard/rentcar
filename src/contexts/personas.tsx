import { createContext, Reducer, useReducer } from "react";
import { useFetch } from "../hooks/useFetch";
import { ControlProps, RequestFilter, ResponseResult } from "../interfaces/globales/global";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { getParamsUrlToString } from "../hooks/useUtils";
import { Persona } from "../interfaces/entidades/persona";

export const PersonasContext = createContext<GlobalContextState<Persona>>({} as GlobalContextState<Persona>)

function PersonasProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Persona>, ACTIONTYPES<Persona>>>(reducer, initialState);
    const api = useFetch();

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            esCedula: true,
            documento: null,
            nombre: null,
            licencia: null,
            provincia: null,
            municipio: null,
            direccion: null,
            telefono1: null,
            telefono2: null,
        });
    }

    const editar = async (item: Persona): Promise<void> => {
        dispatch({ type: ACTIONS.EDITING, model: item });
    }

    const agregar = async (item: Persona): Promise<ResponseResult<Persona>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Post<Persona>('personas', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE, model: null, reload: true });
        return resp;
    }

    const actualizar = async (item: Persona): Promise<ResponseResult<Persona>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Put<Persona>('personas', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE, model: null, reload: true });
        return resp;
    }

    const todos = async (filtro: RequestFilter | null | undefined): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Persona[]>(`personas${getParamsUrlToString(filtro)}`);
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Persona[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Persona>(), paginacion: initialState.paginacion });
        }
    }

    const cancelar = async () => {
        dispatch({ type: ACTIONS.CANCEL });
    }

    return (
        <PersonasContext.Provider value={{
            state,
            nuevo,
            editar,
            agregar,
            actualizar,
            cancelar,
            todos,
        }}>
            {children}
        </PersonasContext.Provider>
    )
}
export default PersonasProvider;