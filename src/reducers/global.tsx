import { PagingResult, RequestFilter, ResponseResult } from "../interfaces/globales/global";

export enum ACTIONS {
    EDITING = 'EDITING',
    FETCHING = 'FETCHING',
    FETCH_COMPLETE = 'FETCH_COMPLETE',
    SUCCESS_WITH_DATA = 'FETCH_SUCCESS_WITH_DATA',
    SUCCESS = 'SUCCESS',
    CANCEL = 'CANCEL',
    ERROR = 'ERROR'
}

export type ACTIONTYPES<DataType> =
    | { type: ACTIONS.EDITING; model: DataType }
    | { type: ACTIONS.FETCHING }
    | { type: ACTIONS.FETCH_COMPLETE; model?: DataType | null; reload?: boolean }
    | { type: ACTIONS.SUCCESS_WITH_DATA; data: DataType[]; paginacion: PagingResult; }
    | { type: ACTIONS.CANCEL }
    | { type: ACTIONS.ERROR; error: string; }

export const initialState = {
    modelo: null,
    datos: [],
    procesando: false,
    editando: false,
    recargar: false,
    paginacion: {
        totalRecords: 0,
        totalPage: 0,
        previousPage: null,
        nextPage: null,
        descripcion: '',
        pageSize: 0,
        currentPage: 0,
        filter: ''
    } as PagingResult
};

export interface State<DataType> {
    modelo: DataType | null | undefined,
    datos: DataType[],
    procesando: boolean,
    editando: boolean,
    recargar: boolean,
    paginacion: PagingResult
}

export interface GlobalContextState<T> {
    state: State<T>,
    nuevo?: () => Promise<void>,
    editar?: (item: T) => Promise<void>,
    agregar?: (item: T) => Promise<ResponseResult<T>>,
    actualizar?: (item: T) => Promise<ResponseResult<T>>,
    todos?: (filter: RequestFilter | null | undefined) => void,
    cancelar?: () => void,
}

const reducer = <DataType extends any>(state: State<DataType>, action: ACTIONTYPES<DataType>): State<DataType> => {

    switch (action.type) {

        case ACTIONS.EDITING: {
            return { ...state, modelo: action.model, editando: true };
        }

        case ACTIONS.CANCEL: {
            return { ...state, modelo: null, editando: false };
        }

        case ACTIONS.FETCHING: {
            return { ...state, procesando: true, };
        }

        case ACTIONS.FETCH_COMPLETE: {
            return {
                ...state,
                modelo: action.model,
                editando: false,
                procesando: false,
                recargar: action.reload ?? false
            };
        }

        case ACTIONS.SUCCESS_WITH_DATA: {
            return {
                ...state,
                datos: action.data,
                paginacion: action.paginacion,
                procesando: false,
            };
        }

        default: {
            return state;
        }
    }

};

export default reducer;