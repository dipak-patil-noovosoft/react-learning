import React, {useMemo, useState} from 'react';
import UserContext from "./UserContext";

function UserContextProvider(props:any) {
    const [user, setUser] = useState({
        id:1,
        firstName:"Terry"
    });

    const setCurrentUser = (userInfo:any) =>{
        setUser(userInfo)
    }

    return (
        <UserContext.Provider value={{user : user,setCurrentUser:setCurrentUser}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;