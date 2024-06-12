import cookie from 'cookie';
import { decrypt, encrypt } from './useUtils';
import { User } from '../interfaces/globales/auth';

export type CookieOptions = {
        expire?: number | Date
        maxAge?: number
        domain?: string
        path?: string
        secure?: boolean
        httpOnly?: boolean
}

const cookieName = '_div.u';

export const setCookie = (value: unknown, options: CookieOptions = { path: '/' }) => {
        const rawCookie: any = {}
        rawCookie[cookieName] = value
        //const encryptText = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
        const encryptText = encrypt(JSON.stringify(value));

        if (typeof value === 'object')
                rawCookie[cookieName] = encryptText

        document.cookie = cookie.serialize(cookieName, rawCookie[cookieName], options)
}

export const getCookie = (): User | null => {
        const cookies = cookie.parse(document.cookie)
        const value = cookies && cookies[cookieName]

        if (value === null || value === undefined || value === 'undefined') {
                return null;
        }

        /* const bytes = CryptoJS.AES.decrypt(value, secretKey)
        const decryptText = bytes.toString(CryptoJS.enc.Utf8) */
        const decryptText = decrypt(value)
        if (!decryptText) {
                return null;
        }

        let jsonResult = JSON.parse(decryptText);
        if (typeof jsonResult === 'string') {
               jsonResult = JSON.parse(jsonResult) 
        }
        return jsonResult as User;
}

export const removeCookie = () => {
        const options = { expires: new Date(1970, 1, 1, 0, 0, 1), maxAge: 0, path: '/' } as CookieOptions
        document.cookie = cookie.serialize(cookieName, '', options)
        document.location.reload();
}