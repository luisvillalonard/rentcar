import { RequestFilter } from "../interfaces/globales/global";
import { secretKey } from "./useConstants";
import * as CryptoJS from 'crypto-js';

export const getParamsUrlToString = (params: RequestFilter | null | undefined) => {

    if (!params) return '';

    const searchParams: Record<string, any> = new URLSearchParams();

    if (params?.pageSize)
        searchParams.append('pageSize', params.pageSize);

    if (params?.currentPage)
        searchParams.append('currentPage', params.currentPage);

    if (params?.filter)
        searchParams.append('filter', params.filter);

    if (searchParams.length === 0)
        return '';

    return '?' + searchParams.toString();
}

export const FormatDate_DDMMYYYY = (fecha: string | null | undefined) => {
    if (!fecha)
        return null;

    try {
        // 1900-01-01 - YEAR-MONTH-DAY
        let [day, month, year] = fecha.split('-');

        day = day.length <= 1 ? '0'.concat(day) : day;
        month = month.length <= 1 ? '0'.concat(month) : month;

        // 01/01/1900 - DAY-MONTH-YEAR
        return [day, month, year].reverse().join('/');
    } catch (e) { }
}

export const FormatDate_YYYYMMDD = (fecha: string): string | null | undefined => {
    if (!fecha)
        return null;

    try {
        // 01/01/1900 - DAY-MONTH-YEAR
        let [day, month, year] = fecha.split('/');

        day = day.length <= 1 ? '0'.concat(day) : day;
        month = month.length <= 1 ? '0'.concat(month) : month;

        // 1900-01-01 - YEAR-MONTH-DAY
        return [day, month, year].reverse().join('-');
    } catch (e) { }
}

export const FormatCedula = (cedula: string | null | undefined): string | null | undefined => {
    if (!cedula)
        return null;

    try {
        // Filter non numbers
        const numeros = cedula.replace(/[^0-9\.]+/g, '');
        console.log('numeros', numeros);

        let inicio: string = numeros.slice(0, 3);
        console.log('inicio', inicio);

        let medio: string = '';
        if (numeros.length > 3) {
            medio = numeros.slice(3, 10)
        }
        console.log('medio', medio);

        let final: string = '';
        if (numeros.length > 3) {
            final = numeros.slice(10, 11)
        }
        console.log('final', final);

        return [inicio, medio, final].join('-');
    } catch (e) { }
}

export const FormatNumber = (valor: any, pos_dec: number = 0) => {

    let strNumero: string = '0.00';
    if (IsNullOrUndefined(valor)) {
        return strNumero;
    };

    if (IsNullOrUndefined(pos_dec)) {
        pos_dec = 0;
    };

    try {
        let _numero = parseFloat(valor);
        if (!IsNullOrUndefined(_numero)) {
            strNumero = _numero.toFixed(pos_dec).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
    } catch (e) {
        return strNumero;
    }

    return strNumero;
}

export const GetFileBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const fileBase64 = (img: any) => {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onerror = reject
        fileReader.onload = function () {
            resolve(fileReader.result)
        }
        fileReader.readAsDataURL(img)
    })
}

export const encrypt = (valor: any) => {
    if (!valor) {
        return null;
    }

    return CryptoJS.AES.encrypt(JSON.stringify(valor), secretKey).toString();
}

export const decrypt = (valor: any) => {
    if (!valor) {
        return null;
    }

    const bytes = CryptoJS.AES.decrypt(valor, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export function IsNullOrUndefined(e: any) {
    if (e === "undefined") {
        return true;
    } else if (e === undefined) {
        return true;
    } else if (e === null) {
        return true;
    };
    return false;
}
