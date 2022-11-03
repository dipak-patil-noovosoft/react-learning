import {useEffect, useState} from "react";
interface Iuser {
    id  :number,
    firstName:string
}
const useUser = (id:number)=>{
    const [user, setUser] = useState<Iuser>({id:id,firstName:""});

    useEffect(() => {
        const getUser = async () =>{
            const response = await fetch(`https://dummyjson.com/users/${id}`)
            const userInfo = await response.json();
            setUser({id :userInfo.id,firstName : userInfo.firstName})
        }
        getUser();
    }, [id]);

    return user;
}
export default useUser;
