export enum RequestMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'PATCH',
    DELETE = 'delete'
}

let cacheApiCall: Record<string, unknown> = {}

export default class Networking {
    static async fetchData<T = unknown>(url: string, requestMethod: RequestMethod, options: RequestInit) {
        if (cacheApiCall[url]) return cacheApiCall[url] as T;

        const res = await fetch(`https://dummyjson.com/${url}`, {
            method: requestMethod,
            ...options
        });
        const data = await res.json();
        if (!res.ok) {
            throw data;
        }
        cacheApiCall[url] = data

        return data as T;
    }

    static getData<T = unknown>(query: string, headers?: HeadersInit) {
        return Networking.fetchData<T>(query, RequestMethod.GET, {headers});
    }
}
