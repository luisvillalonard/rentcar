import { createContext, Reducer, useReducer } from "react";
import { ControlProps} from "../interfaces/globales/global";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { Uso } from "../interfaces/entidades/uso";

export const UsosContext = createContext<GlobalContextState<Uso>>({} as GlobalContextState<Uso>)

function UsosProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Uso>, ACTIONTYPES<Uso>>>(reducer, initialState);
    const api = useFetch();

    const todos = async (): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Uso[]>('usos');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Uso[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Uso>(), paginacion: initialState.paginacion});
        }
    }

    return (
        <UsosContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </UsosContext.Provider>
    )
}
export default UsosProvider;
