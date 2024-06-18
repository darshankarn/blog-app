import { useContext } from "react"
import { UserContext } from "../context/user.context"
import axios from "axios"
import { URL } from "../url"
import { Link, useNavigate } from "react-router-dom"


function Menu() {
    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)
    const nav = useNavigate()
    const handleLogout = async()=>{
      try {
        const res = await axios.get(URL+'/user/logout',{withCredentials: true});
        setUser(null);
        nav('/')
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className="bg-black z-10 bg-opacity-75 w-[200px] flex flex-col items-start absolute md:right-10 top-12 right-6 rounded-md p-4 space-y-4">
        {!user && <h3 className="text-white text-sm hover:text-gray-500"><Link to={'/login'}>Login</Link></h3>}
        {!user && <h3 className="text-white text-sm hover:text-gray-500"><Link to={'/register'}>Register</Link></h3>}
        {user && <h3 className="text-white text-sm hover:text-gray-500"><Link to={`/profile/${user.data._id}`}>Profile</Link></h3>}
        {user && <h3 className="text-white text-sm hover:text-gray-500"><Link to={'/write'}>Write</Link></h3>}
        {user && <h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500">Logout</h3>}
    </div>
  )
}

export default Menu