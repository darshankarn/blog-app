import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProfilePost from "../components/ProfilePost"
import { UserContext } from "../context/user.context"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { URL } from "../url"


function Profile() {
  const {user,setUser} = useContext(UserContext)
  const userId = useParams()?.id
  const nav = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [post,setPost] = useState([]);
  const [error, setError] = useState(null);
  const [update,setUpdate] = useState(false);

  useEffect(()=>{
    fetchUser()
    fetchProfilePost()
  },[])

  const fetchUser = async() => {
    try {
      const res = await axios.get(`${URL}/user/${userId}`,{withCredentials: true})
      setUsername(res.data.data.username)
      setEmail(res.data.data.email)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUserUpdate = async() =>{
    try {
      const updatedUser = {
        username,
        email,
        password
      }

      const res = await axios.put(`${URL}/user/${user.data._id}`,updatedUser,{withCredentials: true});
      //console.log(res)
      setUpdate(true)
      setPassword("")
      window.location.reload();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response ? err.response.data?.message : err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  }

  const handleDelete = async() => {
    try {
      await axios.delete(`${URL}/user/${userId}`,{withCredentials: true});
      await axios.get(URL+'/user/logout',{withCredentials: true});
      setUser(null);
      nav('/')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchProfilePost = async() => {
    try {
      const res = await axios.get(`${URL}/post/user/${userId}`, {withCredentials: true});
      setPost(res.data.data);
      //console.log(post)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div>
        <Navbar/>
        <div className="px-8 md:px-[200px] mt-8 md:min-h-[70vh] flex md:flex-row flex-col-reverse md:items-start items-center">
            <div className="flex flex-col md-w-[70%] w-full mt-8 md:mt-0">
              <h1 className="text-xl font-bold mb-4">Your Blogs</h1>
              {post && post.map((p)=>(
                <Link to={`/posts/post/${p._id}`}><ProfilePost p={p}/></Link>
              ))}
            </div>
            <div className=" md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
              <div className="flex flex-col space-x-4 items-start">
              <h1 className="text-xl font-bold mb-4">Profile</h1>
              {userId === user?.data._id ? 
              <input value={username} onChange={(e)=>setUsername(e.target.value)} className=" outline-none px-4 py-2 text-gray-500" type="text" placeholder="Your Username"/>
              :<p className=" outline-none px-4 py-2 text-black-500 cursor-context-menu">@{username}</p>
              }
              {userId === user?.data._id && <input value={email} onChange={(e)=>setEmail(e.target.value)} className="outline-none px-4 py-2 text-gray-500" type="text" placeholder="Your Email"/>}
              {userId === user?.data._id && <input onChange={(e)=>setPassword(e.target.value)} className="outline-none px-4 py-2 text-gray-500" type="password" placeholder="Current Password"/>}
              {userId === user?.data._id && <div value={password} className="flex items-center space-x-4 mt-8 ">
                <button onClick={handleUserUpdate} className="bg-black w-full md:w-[45%] text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-500 hover:text-black">Update</button>
                {/* <button className="bg-black w-full md:w-[31%] text-base text-white font-semibold px-1 py-1 rounded-md  hover:bg-gray-500 hover:text-black">Cancel</button> */}
                <button onClick={handleDelete} className="bg-black w-full md:w-[45%] text-white font-semibold px-4 py-2 rounded-md  hover:bg-gray-500 hover:text-black">Delete</button>
              </div>}
              {error && <h2 className="text-red-500 text-sm mt-4">{error}</h2>}
              {update && <h2 className="text-blue-500 text-sm mt-4">User updated seccessfully </h2>}
              </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Profile