import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

export const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user); // access user data from store
  const fetchUser = async()=>{
    try{
      const user =  await axios.get(`${BASE_URL}profile/view`,{
        withCredentials:true
      })
      console.log('profile data===',user)
      dispatch(addUser(user?.data))

    }catch (err){
      console.log('Error :',err)
      if(err.status === 401){
        navigate('/login');
      }
    }
  }

  useEffect(()=>{
    if(!userData){
      fetchUser()
    }
  })

  return (
    <div>
      <NavBar/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
