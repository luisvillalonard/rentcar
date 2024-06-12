import { createContext, Reducer, useReducer } from "react";
import { ControlProps} from "../interfaces/globales/global";
import { useFetch } from "../hooks/useFetch";
import reducer, { ACTIONS, ACTIONTYPES, GlobalContextState, initialState, State } from "../reducers/global";
import { Municipio } from "../interfaces/entidades/municipio";

export const MunicipiosContext = createContext<GlobalContextState<Municipio>>({} as GlobalContextState<Municipio>)

function MunicipiosProvider({ children }: ControlProps) {
    const [state, dispatch] = useReducer<Reducer<State<Municipio>, ACTIONTYPES<Municipio>>>(reducer, initialState);
    const api = useFetch();

    const todos = async (): Promise<void> => {
        dispatch({ type: ACTIONS.FETCHING });
        const resp = await api.Get<Municipio[]>('municipios');
        if (resp.ok) {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: resp.datos as Municipio[], paginacion: resp.paginacion });
        } else {
            dispatch({ type: ACTIONS.SUCCESS_WITH_DATA, data: Array<Municipio>(), paginacion: initialState.paginacion});
        }
    }

    return (
        <MunicipiosContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </MunicipiosContext.Provider>
    )
}
export default MunicipiosProvider;
