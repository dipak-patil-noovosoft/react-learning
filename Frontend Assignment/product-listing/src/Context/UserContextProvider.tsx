import React, {useMemo, useState} from 'react';
import UserContext from "./UserContext";
import useUser from "../Components/CustomHooks/useUser";
import {useFetch} from "../Components/CustomHooks/useFetch";
import {IUser} from "../Components/types";

function UserContextProvider(props:any) {

    const [currUserId, setCrrUserId] = useState<number>(1);
    const userFetch = useFetch<IUser>("/users/"+currUserId,{id:1,firstName:""})
    const crrUser = {id:userFetch.id,firstName:userFetch.firstName};

    const setCurrentUser = (userId:any) =>{
        setCrrUserId(userId)
    }

    return (
        <UserContext.Provider value={{user : crrUser,setCurrentUser:setCurrentUser}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;