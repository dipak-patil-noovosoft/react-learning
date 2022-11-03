import React  from 'react'
const user = {
    id:0,
    firstName:""
}
const UserContext = React.createContext({user,setCurrentUser:(e:any)=>{}})
export default UserContext;