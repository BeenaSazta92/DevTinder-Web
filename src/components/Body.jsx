import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

export const Body = () => {
  const user = useSelector((store)=>store.user); // access user data from store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async()=>{
    try{
      const user =  await axios.get(`${BASE_URL}/profile/view`,{
        withCredentials:true
      })
      dispatch(addUser(user?.data));
    }catch (err){
      if(err.status == 401){
        navigate('/login');
      }
    }
  }

  useEffect(()=>{
    fetchUser()
  },[])

  return (
    <div>
      <NavBar/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
