const producction:boolean = false;

export const secretKey = '123456789';

export const API_URL = {
    Base: 'https://rentcarapi.somee.com/',
    //Base: 'https://localhost:44391',
    //Base: 'https://localhost/diversos.api',

    ApiDefaultProps:  {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            mode: 'cors', // no-cors, *cors, same-origin
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: null || '' // body data type must match "Content-Type" header
    }
}
