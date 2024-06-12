import { createContext, Reducer, useReducer } from "react";
import { ControlProps, RequestFilter, ResponseResult } from "../interfaces/globales/global";
import { Marca } from "../interfaces/entidades/marca";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";

export const MarcasContext = createContext<GlobalContextState<Marca>>({} as GlobalContextState<Marca>)

function MarcasProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Marca>, ACTIONTYPES<Marca>>>(reducer, initialState);
    const api = useFetch();

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            nombre: null,
        });
    }

    const editar = async (item: Marca): Promise<void> => {
        dispatch({ type: ACTIONS.EDITING, model: item });
    }

    const agregar = async (item: Marca): Promise<ResponseResult<Marca>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Post<Marca>('marcas', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    const actualizar = async (item: Marca): Promise<ResponseResult<Marca>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Put<Marca>('marcas', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    const todos = async (filtro: RequestFilter | null | undefined): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Marca[]>('marcas');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Marca[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Marca>(), paginacion: initialState.paginacion});
        }
    }

    const cancelar = async () => {
        dispatch({ type: ACTIONS.CANCEL });
    }

    return (
        <MarcasContext.Provider value={{
            state,
            nuevo,
            editar,
            agregar,
            actualizar,
            cancelar,
            todos,
        }}>
            {children}
        </MarcasContext.Provider>
    )
}
export default MarcasProvider;
