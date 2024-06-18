import { Link, useLocation, useNavigate } from "react-router-dom"
import { IoSearchOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import Menu from "./Menu";
import { useContext, useState } from "react";
import { UserContext } from "../context/user.context";


function Navbar({}) {
  const [prompt,setPrompt] = useState("")
  const [menu, setmenu] = useState(false)
  const {user} = useContext(UserContext)
  const navigate = useNavigate();
  const path = useLocation().pathname;
  
  const handlesearch = async()=>{
    try {
      navigate(prompt ? "?search="+prompt : navigate('/'));
      setPrompt("")
    } catch (error) {
      console.log(error)
    }
  }

  const handleKeyDowm = (event)=>{
    if(event.key === 'Enter'){
      handlesearch();
    }
  }

  return (
    <div className="flex item-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog App</Link></h1>
      {path === '/' && <div className="flex justify-center items-center space-x-0">
        <p onClick={handlesearch} className=" cursor-pointer"><IoSearchOutline /></p>
        <input value={prompt} onKeyDown={handleKeyDowm} onChange={(e)=>setPrompt(e.target.value)} className=" outline-none px-3 py-1" placeholder="Search a post" type="text" />
        </div>}
      
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? <h3><Link to="/write">Write</Link></h3> : <h3><Link to="/login">Login</Link></h3>}
        {user ? <div onClick={() => { setmenu(!menu) }} className="text-lg cursor-pointer">
          <p className=" relative"><FaBars /></p>
          {menu && <Menu />}
        </div> : <h3><Link to="/register">Register</Link></h3>}
      </div>
      <div onClick={() => { setmenu(!menu) }} className="md:hidden text-lg cursor-pointer">
        <p><FaBars /></p>
        {menu && <Menu />}
      </div>
    </div>
  )
}

export default Navbar