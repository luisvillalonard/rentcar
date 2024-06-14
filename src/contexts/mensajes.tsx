import { createContext, Reducer, useReducer } from "react";
import { ControlProps, RequestFilter, ResponseResult } from "../interfaces/globales/global";
import { Mensaje } from "../interfaces/entidades/mensaje";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { FormatDate_YYYYMMDD } from "../hooks/useUtils";

export const MensajesContext = createContext<GlobalContextState<Mensaje>>({} as GlobalContextState<Mensaje>)

function MensajesProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Mensaje>, ACTIONTYPES<Mensaje>>>(reducer, initialState);
    const api = useFetch();

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            mensajeId: null,
            nombre: null,
            correo: null,
            comentario: null,
            fecha: new Date().toLocaleDateString("es-DO", {year:"numeric", month: "2-digit", day:"2-digit"}),
            contestado: false
        });
    }

    const editar = async (item: Mensaje): Promise<void> => {
        dispatch({ type: ACTIONS.EDITING, model: item });
    }

    const agregar = async (item: Mensaje): Promise<ResponseResult<Mensaje>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Post<Mensaje>('mensajes', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    const actualizar = async (item: Mensaje): Promise<ResponseResult<Mensaje>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Put<Mensaje>('mensajes', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    const todos = async (filtro: RequestFilter | null | undefined): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Mensaje[]>('mensajes');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Mensaje[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Mensaje>(), paginacion: initialState.paginacion});
        }
    }

    const cancelar = async () => {
        dispatch({ type: ACTIONS.CANCEL });
    }

    return (
        <MensajesContext.Provider value={{
            state,
            nuevo,
            editar,
            agregar,
            actualizar,
            cancelar,
            todos,
        }}>
            {children}
        </MensajesContext.Provider>
    )
}
export default MensajesProvider;
