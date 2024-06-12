import { createContext, Reducer, useReducer } from "react";
import { ControlProps} from "../interfaces/globales/global";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { Estado } from "../interfaces/entidades/estado";

export const EstadosContext = createContext<GlobalContextState<Estado>>({} as GlobalContextState<Estado>)

function EstadosProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Estado>, ACTIONTYPES<Estado>>>(reducer, initialState);
    const api = useFetch();

    const todos = async (): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Estado[]>('estados');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Estado[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Estado>(), paginacion: initialState.paginacion});
        }
    }

    return (
        <EstadosContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </EstadosContext.Provider>
    )
}
export default EstadosProvider;
