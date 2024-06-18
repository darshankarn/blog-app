import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { ImCross } from 'react-icons/im'
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/user.context"
import axios from "axios"
import { URL } from "../url"
import Loader from "../components/Loader"


function UpdatePost() {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [photo, setPhoto] = useState(null);
    const [loader, setloader] = useState(false);
    const {user} = useContext(UserContext)
    const navitage = useNavigate()
    const postId = useParams().id;
    const [change,setchange] = useState(false);

    useEffect(() => {
        fetchPost();
    }, [])


    const fetchPost = async () => {
        try {
            const res = await axios.get(`${URL}/post/${postId}`, { withCredentials: true })
            //console.log(res.data.data)
            setTitle(res.data.data.title)
            setDesc(res.data.data.desc)
            setCats(res.data.data.categories)
            setPhoto(res.data.data.photo)
        } catch (error) {
            console.log(error)
        }
    }
    const [cat, setCat] = useState("");
    const [cats, setCats] = useState([]);

    const deleteCat = (i) => {
        let updateCats = [...cats];
        updateCats.splice(i, 1);
        setCats(updateCats);
    }

    const addCategory = () => {
        let updateCats = [...cats];
        updateCats.push(cat);
        setCat("");
        setCats(updateCats);
    }

    const handleEdit = async (e) => {
        setloader(true)
        e.preventDefault();
        try {
            const post = {
                title,
                desc,
                username: user.data.username,
                userId: user.data._id,
                categories: cats,
            };
            //console.log("Photo before appending to FormData:", photo);
            if (change) {
                const data = new FormData();
                data.append("img", photo);
                //Log FormData contents
            // for (let [key, value] of data.entries()) {
            //     console.log(key, value);
            // }
                try {
                    const res = await axios.post(`${URL}/post/upload`, data);
                    //console.log("Uploaded photo URL:", res.data.data);
                    post.photo = res.data.data
                } catch (error) {
                    console.log("Error uploading photo:", error);
                }
            }else{
                post.photo = photo
            }

            //console.log("Post data before creating:", post);

            // Post creation
            try {
                const response = await axios.put(`${URL}/post/${postId}`, post, { withCredentials: true });
                // console.log("Post created successfully:", response.data);
                setloader(false)
                navitage(`/posts/post/${response.data.data._id}`)
            } catch (error) {
                console.log("Error creating post:", error);
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
    <>{loader ? <Loader/> : 
        <div>
            <Navbar />
            <div className="px-6 md:px-[200px] mt-8">
                <h1 className="font-bold md:text-2xl text-xl">Edit a post</h1>
                <form className="flex flex-col w-full space-y-4 md:space-y-8 mt-4">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter Post Title" className="px-4 py-2 outline-none" />
                    <input onChange={(e) => {
                        setPhoto(e.target.files[0])
                        setchange(true)
                    }} type="file" className="px-4" />
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-4 md:space-x-8">
                            <input value={cat} onChange={(e) => setCat(e.target.value)} type="text" placeholder="Enter Post category" className="px-4 py-2 outline-none" />
                            <div onClick={addCategory} className="bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-md">Add</div>
                        </div>

                        {/* categories */}

                        <div className="flex px-4 mt-3">
                            {cats?.map((c, i) => (
                                <div key={i} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                                    <p>{c}</p>
                                    <p onClick={() => deleteCat(i)} className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"><ImCross /></p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={15} cols={30} className="px-4 py-2 outline-none" placeholder="Enter Post Discription" />
                    <button onClick={handleEdit} className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg rounded-md">Update Post</button>
                </form>
            </div>
            <Footer />
        </div>
}
    </>
    )
}

export default UpdatePost