import {useEffect, useState} from "react";
interface Iuser {
    id  :number,
    firstName:string
}
const useUser = ()=>{
    const [user, setUser] = useState<Iuser>({id:1,firstName:""});

    useEffect(() => {
        const getUser = async () =>{
            const response = await fetch(`https://dummyjson.com/users/${'1'}`)
            const userInfo = await response.json();

            setUser({id :userInfo.id,firstName : userInfo.firstName})
        }
        getUser();
    }, []);

    return user;
}
export default useUser;
