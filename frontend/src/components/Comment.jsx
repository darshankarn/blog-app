import { useContext, useState } from 'react'
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import { UserContext } from '../context/user.context'
import axios from 'axios'
import { URL } from '../url'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

function Comment({com,postId}) {
  const {user} = useContext(UserContext)
  const [loader,setLoader] = useState(false);
  const nav= useNavigate()
  const handleDelete = async() => {
    setLoader(true)
    try {
      await axios.delete(`${URL}/comment/${com._id}`, {withCredentials: true})
      setLoader(false)
      nav(`/posts/post/${postId}`) 
    } catch (error) {
      console.log(error)
    }
  }
  return (
  <>{
    loader ? <Loader/> :
  
  <div className="px-2 py-2 bg-gray-200 rounded-lg my-2"> 
                     <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-600 px-2">@{com.author}</h3>
                        <div className="flex justify-center items-center space-x-4">
                            <p className="text-gray-500 text-sm">{new Date(com.updatedAt).toString().slice(0,15)}</p>
                            <p className="text-gray-500 text-sm">{new Date(com.updatedAt).toString().slice(16,21)}</p>
                            {
                              com.userId === user?.data._id && 
                              <>
                                  <p className=' cursor-pointer' onClick={handleDelete}><MdDelete/></p>
                              </>
                            }
                            
                        </div>
                     </div>
                     <p className="px-2 mt-2">{com.comment}</p>
                </div>
}
  </>
    
  )
}

export default Comment