import { createContext, Reducer, useReducer } from "react";
import { ControlProps, RequestFilter, ResponseResult } from "../interfaces/globales/global";
import { Alquiler } from "../interfaces/entidades/alquiler";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";

export interface AlquilerContextState<T> extends GlobalContextState<T> {
    porPropietario: (codigo: string) => Promise<ResponseResult<Alquiler[]>>,
}

export const AlquileresContext = createContext<AlquilerContextState<Alquiler>>({} as AlquilerContextState<Alquiler>)

function AlquileresProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Alquiler>, ACTIONTYPES<Alquiler>>>(reducer, initialState);
    const api = useFetch();

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            persona: null,
            fechaInicio: null,
            fechaFin: null,
            vehiculo: null,
            precio: 0.00,
            enEfectivo: true,
            efectivo: 0.00,
            comprobante: null,
            notas: []
        });
    }

    const editar = async (item: Alquiler): Promise<void> => {
        dispatch({ type: ACTIONS.EDITING, model: item });
    }

    const agregar = async (item: Alquiler): Promise<ResponseResult<Alquiler>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Post<Alquiler>('alquileres', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    const actualizar = async (item: Alquiler): Promise<ResponseResult<Alquiler>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Put<Alquiler>('alquileres', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    const todos = async (filtro: RequestFilter | null | undefined): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Alquiler[]>('alquileres');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Alquiler[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Alquiler>(), paginacion: initialState.paginacion});
        }
    }

    const porPropietario = async (codigo: string): Promise<ResponseResult<Alquiler[]>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Alquiler[]>(`alquileres/${codigo}/propietario`);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    const cancelar = async () => {
        dispatch({ type: ACTIONS.CANCEL });
    }

    return (
        <AlquileresContext.Provider value={{
            state,
            nuevo,
            editar,
            agregar,
            actualizar,
            cancelar,
            todos,
            porPropietario,
        }}>
            {children}
        </AlquileresContext.Provider>
    )
}
export default AlquileresProvider;
