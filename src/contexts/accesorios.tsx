import { createContext, Reducer, useReducer } from "react";
import { ControlProps} from "../interfaces/globales/global";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { Accesorio } from "../interfaces/entidades/accesorio";

export const AccesoriosContext = createContext<GlobalContextState<Accesorio>>({} as GlobalContextState<Accesorio>)

function AccesoriosProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Accesorio>, ACTIONTYPES<Accesorio>>>(reducer, initialState);
    const api = useFetch();

    const todos = async (): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Accesorio[]>('accesorios');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Accesorio[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Accesorio>(), paginacion: initialState.paginacion});
        }
    }

    return (
        <AccesoriosContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </AccesoriosContext.Provider>
    )
}
export default AccesoriosProvider;
