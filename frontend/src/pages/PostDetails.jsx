import { useContext, useEffect, useState } from "react"
import Comment from "../components/Comment"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import { URL } from "../url"
import Loader from "../components/Loader"
import { GiSnowman } from "react-icons/gi";
import { UserContext } from "../context/user.context"

function PostDetails() {
    const [postdetails, setPostDetails] = useState("")
    const [loading, setLoading] = useState(false)
    const [comments,setComments] = useState([])
    const [comment,setComment] = useState("");
    const postId = useParams()
    const {user} = useContext(UserContext)
    const nav = useNavigate()
    //console.log(user)
    // console.log(postId.id)
    useEffect(() => {
        fetchPostDetails()
        fetchComment()
    }, [postId])

    const fetchPostDetails = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${URL}/post/${postId.id}`, { withCredentials: true })
            //console.log(res.data.data)
            setPostDetails(res.data.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(true)
        }
    }

    const handleDeletePost = async()=>{
        try {
            await axios.delete(`${URL}/post/${postId.id}`,{withCredentials: true})
            nav('/');
        } catch (error) {
            console.log(error);
        }
    }

    const fetchComment = async()=>{
        try {
            const res = await axios.get(`${URL}/comment/post/${postId.id}`);
            setComments(res.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleComment = async(e)=>{
        e.preventDefault();
        try {
           const comt = {
            comment,
            author : user.data.username,
            postId: postId.id,
            userId: user.data._id,
           }

           const res = await axios.post(`${URL}/comment/create`,comt,{withCredentials: true})
           fetchComment();
           setComment('');
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <Navbar />
            <div className=" px-8 md:px-[200px] mt-8">
                {loading ? <Loader/> : postdetails ?
                    <>
                        <div className=" flex justify-between items-center">
                            <h1 className=" text-2xl font-bold text-black md:text-3xl">{postdetails.title}</h1>
                            {user.data._id === postdetails.userId && 
                            <div className="flex items-center justify-center space-x-2">
                                <Link to={`/edit/${postId.id}`}>
                                   <p><BiEdit /></p>
                                </Link>
                                <p className=" cursor-pointer" onClick={handleDeletePost}><MdDelete /></p>
                            </div> }
                        </div>
                        <div className="flex items-center justify-between mt-2 md:mt-4">
                            <Link to={`/profile/${postdetails.userId}`}><p>@{postdetails.username}</p></Link>
                            <div className="flex space-x-2">
                                <p>{new Date(postdetails.updatedAt).toString().slice(0,15)}</p>
                                <p>{new Date(postdetails.updatedAt).toString().slice(16,21)}</p>
                            </div>
                        </div>
                        <img src={postdetails.photo} alt="" className=" w-full mx-auto mt-8"/>
                        <div className="mx-auto mt-8" dangerouslySetInnerHTML={{ __html: postdetails.desc }} />
                        <div className="flex items-center mt-8 space-x-4 space-y-1 font-semibold flex-wrap">
                            <p>Categories:</p>
                            <div className="flex justify-center items-center gap-2 flex-wrap">
                            {postdetails.categories.map((cat,i)=>(
                                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1 text-xs md:text-sm">{cat}</div>
                            ))}
                            </div>
                        </div>
                        <div className="flex flex-col mt-4">
                            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
                            {/* comment */}
                            {
                                comments && comments.map((com,i)=>(
                                    <Comment key={i} com={com} postId={postId.id}/>
                                ))
                            }
                        </div>

                        {/* write a comment */}
                        <div className="w-full flex flex-col mt-4 md:flex-row">
                            <input value={comment} onChange={(e)=>setComment(e.target.value)} type="text" placeholder="write a comment" className="md:w-[80%] outline-none px-4 mt-4 md:mt-0" />
                            <button onClick={handleComment} className="bg-black text-sm text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0 rounded-md">Add Comment</button>
                        </div>
                    </>
                    : <div className="flex flex-col min-h-[80vh] justify-center items-center pt-6">
                        <GiSnowman size={100} />
                        <h3 className=" text-gray-500 text-lg font-semibold">No matching Post found</h3>
                    </div>
                }

            </div>
            <Footer />
        </div>
    )
}

export default PostDetails