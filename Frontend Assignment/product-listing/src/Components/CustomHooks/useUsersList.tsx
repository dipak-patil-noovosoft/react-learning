import { useEffect, useState} from "react";

const useUsersList = () =>{
    const [users, setUsers] = useState([{id:1,firstName:""}]);

    useEffect(() => {
        const getAllUsers = async () =>{
            const response = await fetch(`https://dummyjson.com/users`);
            const usersData = await response.json();
            setUsers(usersData.users);
        }
        getAllUsers();
    }, []);
    return users;
}
export default useUsersList;
