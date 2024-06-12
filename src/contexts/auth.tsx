import { createContext, useReducer } from "react";
import { Login, User } from "../interfaces/globales/auth";
import { ControlProps, ResponseResult } from "../interfaces/globales/global";
import { useFetch } from "../hooks/useFetch";
import { setCookie, getCookie, removeCookie } from "../hooks/useCookies";
import authReducer, { authInitialState } from "../reducers/auth";

export interface AuthState {
    user: User | null | undefined;
    isLogged: boolean;
    isLogin: boolean;
    procesando: boolean
}
export interface AuthReducerState {
    state: AuthState,
    validar: (user: Login) => Promise<ResponseResult<User>>,
    LoggedIn: (user: User) => void,
    LoggedOut: () => void,
    getUser: () => void
}

export const AuthContext = createContext<AuthReducerState>({} as AuthReducerState);

export const AuthProvider = ({ children }: ControlProps) => {
    const [state, dispatch] = useReducer(authReducer, authInitialState);
    const api = useFetch();

    const validar = async (user: Login): Promise<ResponseResult<User>> => {
        dispatch({ type: 'FETCHING' })
        const resp = await api.Post<User>('usuarios/validar', user);
        if (resp.ok) {
            dispatch({ type: 'SIGN_IN', payload: resp.datos as User })
            LoggedIn(resp.datos as User);
        }
        dispatch({ type: 'FETCH_COMPLETE' })
        return resp;
    }

    const getUser = (): User | null => {
        const valor: User | null = getCookie();
        if (valor) {
            dispatch({ type: 'SIGN_IN', payload: valor })
        } else {
            dispatch({ type: 'SIGN_OUT' })
        }
        return valor;
    }

    const LoggedIn = (user: User) => {
        setCookie(user);
    }

    const LoggedOut = () => {
        removeCookie();
    }
    
    return (
        <AuthContext.Provider value={{
            state,
            validar,
            LoggedIn,
            LoggedOut,
            getUser,
}}>
            {children}
        </AuthContext.Provider>
    )
}