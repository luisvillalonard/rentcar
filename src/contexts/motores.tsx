import { createContext, Reducer, useReducer } from "react";
import { ControlProps} from "../interfaces/globales/global";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { Motor } from "../interfaces/entidades/motor";

export const MotoresContext = createContext<GlobalContextState<Motor>>({} as GlobalContextState<Motor>)

function MotoresProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Motor>, ACTIONTYPES<Motor>>>(reducer, initialState);
    const api = useFetch();

    const todos = async (): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Motor[]>('motores');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Motor[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Motor>(), paginacion: initialState.paginacion});
        }
    }

    return (
        <MotoresContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </MotoresContext.Provider>
    )
}
export default MotoresProvider;
