import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProfilePost from "../components/ProfilePost"


function Profile() {
  return (
    <div>
        <Navbar/>
        <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-center">
            <div className="flex flex-col md-w-[70%] w-full mt-8 md:mt-0">
              <h1 className="text-xl font-bold mb-4">Your Posts</h1>
              <ProfilePost/>
              <ProfilePost/>
              <ProfilePost/>
              <ProfilePost/>
            </div>
            <div className=" md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
              <div className="flex flex-col space-x-4 items-start">
              <h1 className="text-xl font-bold mb-4">Profile</h1>
              <input className=" outline-none px-4 py-2 text-gray-500" type="text" placeholder="Your Username"/>
              <input className="outline-none px-4 py-2 text-gray-500" type="text" placeholder="Your Email"/>
              <input className="outline-none px-4 py-2 text-gray-500" type="password" placeholder="Your Password"/>
              <div className="flex items-center space-x-4 mt-8 ">
                <button className="bg-black w-full md:w-[45%] text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-500 hover:text-black">Update</button>
                {/* <button className="bg-black w-full md:w-[31%] text-base text-white font-semibold px-1 py-1 rounded-md  hover:bg-gray-500 hover:text-black">Cancel</button> */}
                <button className="bg-black w-full md:w-[45%] text-white font-semibold px-4 py-2 rounded-md  hover:bg-gray-500 hover:text-black">Delete</button>
              </div>
              </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Profile