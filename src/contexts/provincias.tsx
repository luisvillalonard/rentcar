import { createContext, Reducer, useReducer } from "react";
import { ControlProps} from "../interfaces/globales/global";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { Provincia } from "../interfaces/entidades/provincia";

export const ProvinciasContext = createContext<GlobalContextState<Provincia>>({} as GlobalContextState<Provincia>)

function ProvinciasProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Provincia>, ACTIONTYPES<Provincia>>>(reducer, initialState);
    const api = useFetch();

    const todos = async (): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Provincia[]>('provincias');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Provincia[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Provincia>(), paginacion: initialState.paginacion});
        }
    }

    return (
        <ProvinciasContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </ProvinciasContext.Provider>
    )
}
export default ProvinciasProvider;
