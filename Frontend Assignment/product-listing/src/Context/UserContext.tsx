import React  from 'react'
const user = {
    id:1,
    firstName:""
}
const UserContext = React.createContext({user,setCurrentUser:(e:any)=>{}})
export default UserContext;