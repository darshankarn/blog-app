import { createContext, useEffect, useState } from "react";
import {URL} from '../url.js'
import axios from "axios";
export const UserContext = createContext({})

export function UserContextProvider({children}){
    const [user, setUser] = useState(null)
    useEffect(() => {
      getuser()
    }, [])
    
    const getuser = async()=>{
        try {
            const res = await axios.get(`${URL}/user/refetch`,{withCredentials: true})
            setUser(res.data)

        } catch (error) {
            console.log(err);
        }
    }
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}