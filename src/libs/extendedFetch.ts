const jsonToQueryString = (json: any) => {
    return '?' +
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
};


const extendedFetch = (method:string, url: string, body?: any , headers?: any) => {
    const options = {
        method: method,
        timeout: 5000,
        credentials: "same-origin",
        headers: Object.assign({} , body instanceof FormData ? 
            {'Accept': 'application/json'} : 
            {'Content-Type': 'application/json'} 
        , headers)
    } as any;

    if (body) {
        if (method === 'GET') {
            url = `${url}${jsonToQueryString(body)}`
        }
        else {
            options.body = body instanceof FormData ? body : JSON.stringify(body);
        }
    }
    //console.log(method,url , body);
    return fetch(url, options);
};

export default {
    jsonFetch: extendedFetch,

    post: (url: string, body: any , headers = {}) =>  {
        return extendedFetch('POST', url, body , headers);
    },

    get: (url: string, body?: any) => {
        return extendedFetch('GET', url, body);
    },

    put: (url: string, body: any) => {
        return extendedFetch('PUT', url, body);
    },

    delete: (url: string, body: any) => {
        return extendedFetch('DELETE', url, body);
    }
}
