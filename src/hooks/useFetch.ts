import { User } from "../interfaces/globales/auth";
import { PagingResult, ResponseResult } from "../interfaces/globales/global";
import { API_URL } from "./useConstants";
import { getCookie } from "./useCookies";

export const useFetch = () => {

    async function customFetch<T extends any>(url: string, options?: RequestInit): Promise<ResponseResult<T>> {

        const user = getCookie() as User;
        let resp: ResponseResult<T> = {
            ok: false,
            datos: null,
            mensaje: null,
            paginacion: {} as PagingResult
        }

        const defaultHeaders = { ...API_URL.ApiDefaultProps.headers };
        const reqMethod = !options?.method ? API_URL.ApiDefaultProps.method : options.method;
        const reqHeader = options?.headers ? { ...options.headers, ...defaultHeaders } : defaultHeaders;
        const reqBody = !options?.body ? null : JSON.stringify(options?.body);
        const reqOptions = {
            method: reqMethod,
            headers: reqHeader,
            body: reqBody,
        }

        /* const authHeader = new Headers();
        authHeader.append('Authorization', `${user?.id || ''}`);

        const configInit : RequestInit = {
            method: options?.method || 'GET',
            headers: { ...options?.headers, ...authHeader },
            cache: 'default'
        }; */

        try {
            resp = await fetch(`${API_URL.Base}/api/${url}`, reqOptions)
                .then((res) => {
                    return res.json() as Promise<ResponseResult<T>>
                })
                .then((data) => {
                    return data
                })

            return resp;
        } catch (err: unknown) {
            const { message } = err as Error;
            resp = {
                ...resp,
                ok: false,
                mensaje: (message || 'Situación inesperada tratando de obtener los datos')
            }
            return resp
        }
    }

    const Get = async <T extends any>(url: string) => await customFetch<T>(url);

    const Post = async <T extends any>(url: string, item: T | any) => {
        return await customFetch<T>(url, {
            method: 'POST',
            body: item
        })
    }

    const Put = async <T extends any>(url: string, item: T | any) => {
        return await customFetch<T>(url, {
            method: 'PUT',
            body: item
        })
    }

    const Del = async(url: string, item?: any) => {
        return await customFetch(url, {
            method: 'DELETE',
            body: item
        })
    }

    return {
        Get,
        Post,
        Put,
        Del,
    }

}