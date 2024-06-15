import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import Profile from './pages/Profile'

function App() {

  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/posts/post/:id' element={<PostDetails/>}/>
        <Route exact path='/write' element={<CreatePost/>}/> 
        <Route exact path='/edit/:id' element={<UpdatePost/>}/>
        <Route exact path='/profile/:id' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App
