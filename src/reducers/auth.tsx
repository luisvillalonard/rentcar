import { AuthState } from "../contexts/auth";
import { Login, User } from "../interfaces/globales/auth";

export const authInitialState: AuthState = {
    user: null,
    isLogged: false,
    isLogin: false,
    procesando: false
}


type AuthAction =
    | { type: 'FETCHING' }
    | { type: 'FETCH_COMPLETE' }
    | { type: 'NEW_LOGIN', payload: Login | null }
    | { type: 'SIGN_IN', payload: User | null }
    | { type: 'SIGN_OUT' }

export default function authReducer(state: AuthState, action: AuthAction): AuthState {

    switch (action.type) {
        case 'FETCHING':
            return {
                ...state,
                procesando: true
            }

        case 'FETCH_COMPLETE':
            return {
                ...state,
                procesando: false
            }

        case 'NEW_LOGIN':
            return {
                ...state,
                isLogin: !action.payload ? false : true
            }

        case 'SIGN_IN':
            return {
                ...state,
                user: action.payload,
                isLogged: !action.payload ? false : true
            }

        case 'SIGN_OUT':
            return {
                ...state,
                user: null,
                isLogged: false
            }

        default:
            return state;
    }

}
