import {useEffect, useState} from "react";

const useUserData = (userID :number) =>{
    const [userData, setUserData] = useState({firstname:"",lastname :""});
    useEffect(() => {
        const getUser = async () =>{
            const response = await  fetch(`https://dummyjson.com/users/${userID}`)
            const data = await  response.json();
            setUserData({firstname: data.firstName,lastname: data.lastName});
        }
         getUser().catch(err => console.log(err));
    }, [userID]);
    return userData;
}

const CustomHook = () => {
    const [userId, setUserId] = useState(0);

    const data = useUserData(userId);
    if(!data)return null ;

    return (
        <div>
            <h3>Enetr User Id : </h3>
            <input id="userIdInput" type="number" value={userId} onChange={e => setUserId(parseInt(e.target.value))}/>
            <p>Name : {data.firstname} </p>
            <p>lastName : {data.lastname}</p>
        </div>
    )
}
export default CustomHook