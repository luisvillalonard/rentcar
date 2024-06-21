import { createContext, Reducer, useReducer } from "react";
import { ControlProps, RequestFilter, ResponseResult } from "../interfaces/globales/global";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { Vehiculo } from "../interfaces/entidades/vehiculo";
import { getParamsUrlToString } from "../hooks/useUtils";
import { AlquilerFiltro } from "../interfaces/entidades/alquiler";

export interface VehiculoContextState<T> extends GlobalContextState<T> {
    porCodigo: (codigo: string) => Promise<ResponseResult<Vehiculo>>,
    porPropietario: (codigo: string) => Promise<void>,
    disponibles: (item: AlquilerFiltro) => Promise<ResponseResult<Vehiculo[]>>,
}

export const VehiculosContext = createContext<VehiculoContextState<Vehiculo>>({} as VehiculoContextState<Vehiculo>)

function VehiculosProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Vehiculo>, ACTIONTYPES<Vehiculo>>>(reducer, initialState);
    const api = useFetch();

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            codigo: null,
            persona: null,
            tipo: null,
            marca: null,
            modelo: null,
            combustible: null,
            transmision: null,
            traccion: null,
            interior: null,
            exterior: null,
            motor: null,
            precio: 0,
            puertas: 0,
            pasajeros: 0,
            carga: null,
            uso: null,
            enKilometros: false,
            enMillas: false,
            foto: null,
            fotos: [],
            accesorios: []
        });
    }

    const editar = async (item: Vehiculo): Promise<void> => {
        dispatch({ type: ACTIONS.EDITING, model: item });
    }

    const agregar = async (item: Vehiculo): Promise<ResponseResult<Vehiculo>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Post<Vehiculo>('vehiculos', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    const actualizar = async (item: Vehiculo): Promise<ResponseResult<Vehiculo>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Put<Vehiculo>('vehiculos', item);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    const todos = async (filtro: RequestFilter | null | undefined): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Vehiculo[]>(`vehiculos${getParamsUrlToString(filtro)}`);
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Vehiculo[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Vehiculo>(), paginacion: initialState.paginacion});
        }
    }

    const cancelar = async () => {
        dispatch({ type: ACTIONS.CANCEL });
    }

    const porCodigo = async (codigo: string): Promise<ResponseResult<Vehiculo>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Vehiculo>(`vehiculos/${codigo}`);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    const porPropietario = async (codigo: string): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Vehiculo[]>(`vehiculos/propietario/${codigo}`);
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Vehiculo[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Vehiculo>(), paginacion: initialState.paginacion});
        }
    }

    const disponibles = async (filtro: AlquilerFiltro): Promise<ResponseResult<Vehiculo[]>> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Post<Vehiculo[]>('vehiculos/disponibles', filtro);
        dispatch({ type: ACTIONS.FETCH_COMPLETE });
        return resp;
    }

    return (
        <VehiculosContext.Provider value={{
            state,
            nuevo,
            editar,
            agregar,
            actualizar,
            cancelar,
            todos,
            porCodigo,
            porPropietario,
            disponibles,
        }}>
            {children}
        </VehiculosContext.Provider>
    )
}
export default VehiculosProvider;
