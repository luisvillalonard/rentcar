import { createContext, Reducer, useReducer } from "react";
import { ControlProps} from "../interfaces/globales/global";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { Color } from "../interfaces/entidades/color";

export const ColoresContext = createContext<GlobalContextState<Color>>({} as GlobalContextState<Color>)

function ColoresProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Color>, ACTIONTYPES<Color>>>(reducer, initialState);
    const api = useFetch();

    const todos = async (): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Color[]>('colores');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Color[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Color>(), paginacion: initialState.paginacion});
        }
    }

    return (
        <ColoresContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </ColoresContext.Provider>
    )
}
export default ColoresProvider;
