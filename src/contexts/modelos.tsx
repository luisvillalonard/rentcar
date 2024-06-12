import { createContext, Reducer, useReducer } from "react";
import { ControlProps} from "../interfaces/globales/global";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { Modelo } from "../interfaces/entidades/modelo";

export const ModelosContext = createContext<GlobalContextState<Modelo>>({} as GlobalContextState<Modelo>)

function ModelosProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Modelo>, ACTIONTYPES<Modelo>>>(reducer, initialState);
    const api = useFetch();

    const todos = async (): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Modelo[]>('modelos');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Modelo[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Modelo>(), paginacion: initialState.paginacion});
        }
    }

    return (
        <ModelosContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </ModelosContext.Provider>
    )
}
export default ModelosProvider;
