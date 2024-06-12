import { createContext, Reducer, useReducer } from "react";
import { ControlProps} from "../interfaces/globales/global";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { Traccion } from "../interfaces/entidades/traccion";

export const TraccionesContext = createContext<GlobalContextState<Traccion>>({} as GlobalContextState<Traccion>)

function TraccionesProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Traccion>, ACTIONTYPES<Traccion>>>(reducer, initialState);
    const api = useFetch();

    const todos = async (): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Traccion[]>('tracciones');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Traccion[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Traccion>(), paginacion: initialState.paginacion});
        }
    }

    return (
        <TraccionesContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </TraccionesContext.Provider>
    )
}
export default TraccionesProvider;
