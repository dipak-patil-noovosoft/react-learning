import {useEffect, useRef, useState} from "react";

type Cache<TCache> = { [url: string]: TCache }

export const useFetch = <Type = unknown> (endpoint:string,initialSate:any = []) =>{
    const [state, setState] = useState<Type> (initialSate);

    const cache = useRef<Cache<Type>>({})

    useEffect(() => {
        if (!endpoint) return

        if(cache.current[endpoint]){
            setState(cache.current[endpoint])
            return;
        }
        const getData = async () =>{
            const response = await fetch(`https://dummyjson.com${endpoint}`)
            const data = await response.json();
            setState(data)
            cache.current[endpoint] = data
        }
        getData()
    }, [endpoint]);
    return state
}
