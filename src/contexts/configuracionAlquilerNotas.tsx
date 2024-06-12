import { createContext, Reducer, useReducer } from "react";
import { ControlProps, RequestFilter, ResponseResult } from "../interfaces/globales/global";
import { ConfiguracionAlquilerNota } from "../interfaces/entidades/configuracionAlquilerNota";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";

export const ConfiguracionAlquilerNotasContext = createContext<GlobalContextState<ConfiguracionAlquilerNota>>({} as GlobalContextState<ConfiguracionAlquilerNota>)

function ConfiguracionAlquilerNotasProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<ConfiguracionAlquilerNota>, ACTIONTYPES<ConfiguracionAlquilerNota>>>(reducer, initialState);
    const api = useFetch();

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            nombre: null,
        });
    }

    const editar = async (item: ConfiguracionAlquilerNota): Promise<void> => {
        dispatch({ type: ACTIONS.EDITING, model: item });
    }

    const agregar = async (item: ConfiguracionAlquilerNota): Promise<ResponseResult<ConfiguracionAlquilerNota>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Post<ConfiguracionAlquilerNota>('configuracionAlquilerNotas', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    const actualizar = async (item: ConfiguracionAlquilerNota): Promise<ResponseResult<ConfiguracionAlquilerNota>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Put<ConfiguracionAlquilerNota>('configuracionAlquilerNotas', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    const todos = async (filtro: RequestFilter | null | undefined): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<ConfiguracionAlquilerNota[]>('configuracionAlquilerNotas');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as ConfiguracionAlquilerNota[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<ConfiguracionAlquilerNota>(), paginacion: initialState.paginacion});
        }
    }

    const cancelar = async () => {
        dispatch({ type: ACTIONS.CANCEL });
    }

    return (
        <ConfiguracionAlquilerNotasContext.Provider value={{
            state,
            nuevo,
            editar,
            agregar,
            actualizar,
            cancelar,
            todos,
        }}>
            {children}
        </ConfiguracionAlquilerNotasContext.Provider>
    )
}
export default ConfiguracionAlquilerNotasProvider;
