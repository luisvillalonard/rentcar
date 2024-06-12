import { createContext, Reducer, useReducer } from "react";
import { ControlProps} from "../interfaces/globales/global";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { Combustible } from "../interfaces/entidades/combustible";

export const CombustiblesContext = createContext<GlobalContextState<Combustible>>({} as GlobalContextState<Combustible>)

function CombustiblesProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Combustible>, ACTIONTYPES<Combustible>>>(reducer, initialState);
    const api = useFetch();

    const todos = async (): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Combustible[]>('combustibles');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Combustible[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Combustible>(), paginacion: initialState.paginacion});
        }
    }

    return (
        <CombustiblesContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </CombustiblesContext.Provider>
    )
}
export default CombustiblesProvider;
