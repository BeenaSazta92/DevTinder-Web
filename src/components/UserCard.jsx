import React from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { removeFeed } from '../utils/feedSlice'

const UserCard = ({user}) => {
    const dispatch = useDispatch();
    const handleSendRequest = async (status,toUserId)=>{
        try{
            await axios.post(`${BASE_URL}/request/send/${status}/${toUserId}`,{},{
                withCredentials :true
            })
            dispatch(removeFeed(toUserId))
        }catch (err){
            console.log('Error ',err)
        }
    }
  return (
    <div>
        <div className="flex justify-center my-10 card bg-base-200 w-96 h-120 shadow-sm">
            <figure>
                <img
                src={user?.profileUrl}
                alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user?.firstName || ''+ " " +user?.lastName ||''}</h2>
                {user?.age && user?.gender&& <p>{user?.age + ", " + user?.gender}</p>}
                <p>{user?.about}</p>
                <div className="card-actions justify-center my-5">
                    <button className="btn btn-primary" onClick={()=>handleSendRequest('ignored',user?._id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={()=>handleSendRequest('interested',user?._id)}>Interested</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard