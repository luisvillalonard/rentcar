import { createContext, Reducer, useReducer } from "react";
import { ControlProps} from "../interfaces/globales/global";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { Transmision } from "../interfaces/entidades/transmision";

export const TransmisionesContext = createContext<GlobalContextState<Transmision>>({} as GlobalContextState<Transmision>)

function TransmisionesProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Transmision>, ACTIONTYPES<Transmision>>>(reducer, initialState);
    const api = useFetch();

    const todos = async (): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Transmision[]>('transmisiones');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Transmision[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Transmision>(), paginacion: initialState.paginacion});
        }
    }

    return (
        <TransmisionesContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </TransmisionesContext.Provider>
    )
}
export default TransmisionesProvider;
