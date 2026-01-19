import axios from 'axios';
import React from 'react'
import {useDispatch, useSelector} from 'react-redux' // get user from redux store
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import {removeUser} from '../utils/userSlice'
import { removeFeed } from '../utils/feedSlice';
axios.defaults.withCredentials = true;

const NavBar = () => {
  const user = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelLogout = async()=>{ 
    try{
      await axios.post(`${BASE_URL}/logout`,{
        withCredentials:true
      })
      dispatch(removeUser());
      dispatch(removeFeed())
      return navigate('/login')
    }catch (err){
      console.log('Error ',err)
    }
  }
  return (
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link to ="/" className="btn btn-ghost text-xl">Dev Tinder</Link>
        </div>
        <div className="flex gap-2">
        {user&& (
          <div className="dropdown dropdown-end mx-5 flex">
            <div className='fieldset'>Welcome, {user?.firstName}</div>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Dp"
                  src={user?.profileUrl } 
                  />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to='/connections'>Connections</Link></li>
              <li><Link to ='/requests'>Request</Link></li>
              <li><Link onClick={handelLogout}>Logout</Link></li>

            </ul>
          </div>
        )}
        </div>
      </div>
  )
}

export default NavBar