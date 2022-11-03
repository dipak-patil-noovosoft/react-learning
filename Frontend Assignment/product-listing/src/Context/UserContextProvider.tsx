import React, {useEffect, useState} from 'react';
import UserContext from "./UserContext";

function UserContextProvider(props:any) {
    const [user, setUser] = useState({
        id:0,
        firstName:""
    });

    const setCurrentUser = (userInfo:any) =>{
        setUser(userInfo)
    }
    return (
        <UserContext.Provider value={{user,setCurrentUser}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;