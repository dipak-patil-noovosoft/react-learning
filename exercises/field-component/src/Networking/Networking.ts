export enum RequestMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'PATCH',
    DELETE = 'delete'
}

export default class Networking {
    static async fetchData<T = unknown>(url: string, requestMethod: RequestMethod, options: RequestInit) {
        const res = await fetch(`https://dummyjson.com/${url}`, {
            method: requestMethod,
            ...options
        });
        const data = await res.json();
        if (!res.ok) {
            throw data;
        }
        return data as T;
    }

    static getData<T = unknown>(query: string, headers?: HeadersInit) {
        return Networking.fetchData<T>(query, RequestMethod.GET, {headers});
    }
}
