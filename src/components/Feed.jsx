import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import {addFeed} from '../utils/feedSlice' 
import UserCard from './userCard'

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store)=>store.feed)
  
  const getFeed = async() =>{
    if(feed) return
    try{
      const userFeed = await axios.get(`${BASE_URL}/user/feed`,
        {withCredentials:true});
        dispatch(addFeed(userFeed?.data?.data))
    }catch (err){
      console.log(err)
    }
  }
  useEffect( ()=>{
    getFeed()
  },[])

  return (
    feed&&
    <div className='flex justify-center my-10'>
      <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed