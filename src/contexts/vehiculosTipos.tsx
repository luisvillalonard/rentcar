import { createContext, Reducer, useReducer } from "react";
import { ControlProps} from "../interfaces/globales/global";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { VehiculoTipo } from "../interfaces/entidades/vehiculoTipo";

export const VehiculosTiposContext = createContext<GlobalContextState<VehiculoTipo>>({} as GlobalContextState<VehiculoTipo>)

function VehiculosTiposProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<VehiculoTipo>, ACTIONTYPES<VehiculoTipo>>>(reducer, initialState);
    const api = useFetch();

    const todos = async (): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<VehiculoTipo[]>('vehiculos/tipos');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as VehiculoTipo[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<VehiculoTipo>(), paginacion: initialState.paginacion});
        }
    }

    return (
        <VehiculosTiposContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </VehiculosTiposContext.Provider>
    )
}
export default VehiculosTiposProvider;
