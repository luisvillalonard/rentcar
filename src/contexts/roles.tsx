import { createContext, Reducer, useReducer } from "react";
import { useFetch } from "../hooks/useFetch";
import { ControlProps, RequestFilter, ResponseResult } from "../interfaces/globales/global";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { getParamsUrlToString } from "../hooks/useUtils";
import { Rol } from "../interfaces/entidades/rol";

export const RolesContext = createContext<GlobalContextState<Rol>>({} as GlobalContextState<Rol>)

function RolesProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Rol>, ACTIONTYPES<Rol>>>(reducer, initialState);
    const api = useFetch();

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            nombre: null,
            administrador: false,
            propietario: false
        });
    }

    const editar = async (item: Rol): Promise<void> => {
        dispatch({ type: ACTIONS.EDITING, model: item });
    }

    const agregar = async (item: Rol): Promise<ResponseResult<Rol>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Post<Rol>('roles', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE, reload: true });
        return resp;
    }

    const actualizar = async (item: Rol): Promise<ResponseResult<Rol>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Put<Rol>('roles', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE, reload: true });
        return resp;
    }

    const todos = async (filtro: RequestFilter | null | undefined): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Rol[]>(`roles${getParamsUrlToString(filtro)}`);
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Rol[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Rol>(), paginacion: initialState.paginacion});
        }
    }

    const cancelar = async () => {
        dispatch({ type: ACTIONS.CANCEL });
    }

    return (
        <RolesContext.Provider value={{
            state,
            nuevo,
            editar,
            agregar,
            actualizar,
            cancelar,
            todos,
        }}>
            {children}
        </RolesContext.Provider>
    )
}
export default RolesProvider;