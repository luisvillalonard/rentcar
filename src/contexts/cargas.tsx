import { createContext, Reducer, useReducer } from "react";
import { ControlProps} from "../interfaces/globales/global";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { Carga } from "../interfaces/entidades/carga";

export const CargasContext = createContext<GlobalContextState<Carga>>({} as GlobalContextState<Carga>)

function CargasProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Carga>, ACTIONTYPES<Carga>>>(reducer, initialState);
    const api = useFetch();

    const todos = async (): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Carga[]>('cargas');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Carga[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Carga>(), paginacion: initialState.paginacion});
        }
    }

    return (
        <CargasContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </CargasContext.Provider>
    )
}
export default CargasProvider;
