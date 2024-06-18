import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import HomePosts from "../components/HomePosts"
import Navbar from "../components/Navbar"
import axios from "axios"
import { URL } from "../url"
import { Link, useLocation } from "react-router-dom"
import { GiSnowman } from "react-icons/gi";
import Loader from '../components/Loader'
import { UserContext } from "../context/user.context"

function Home() {
  const {search} = useLocation()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const {user} = useContext(UserContext)
  // console.log(user)
 useEffect(() => {
   fetchPost()
 }, [search])
 
  

  const fetchPost = async()=>{
    setLoading(true)
    try {
      const res = await axios.get(URL+"/post/"+search)
      setPosts(res.data.data)
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(true)
    }
  }
  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loading ? <Loader/> : posts.length ? posts.map((post)=>(
          <>
            <Link to={user ? `/posts/post/${post._id}` : '/login'}>
                <HomePosts key={post._id} post={post}/>
            </Link>
          </>
        )):
        <div className="flex flex-col min-h-[80vh] justify-center items-center pt-6">
          <GiSnowman size={100}/>
          <h3 className=" text-gray-500 text-lg font-semibold">No matching Post found</h3>
        </div> 
        }
      </div>
      <Footer/>
    </>
  )
}

export default Home