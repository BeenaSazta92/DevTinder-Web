import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constant';
import { addRequests } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store)=>store.requests);
    const fecthRequestData = async ()=>{
        try{
            const res = await axios.get(`${BASE_URL}/user/request/received`,{
                withCredentials: true
            })
            console.log(res)
            dispatch(addRequests(res?.data?.data))
        }catch (err){
            console.log('ERROR :',err)
        }
    }

    useEffect(()=>{
        fecthRequestData()
    },[]);
    
   return (
        <div className='flex justify-center my-10'>
            {requests?.length===0? (
                <h1 className='text-bold text-2xl'>No Connection Requests</h1>
            ):(
                <div className="justify-center gap-4">
                    <h1 className='text-bold text-3xl text-white'>Connection Requests</h1>
                    {requests?.map((request,i)=>{
                        const {firstName,lastName,profileUrl,age,gender,about} = request?.fromUserId
                        return <div key={i} className="flex item-centered rounded-lg bg-base-300 p-4 m-4 w 2/3 mx-auto">
                            <div>
                                <img className = 'w-20 h-20 rounded-full' alt='photo' src={profileUrl} /></div>
                            <div className='text-left mx-4'>
                                <h2 className='font-bold text-xl'>{firstName + " "+ lastName} </h2>
                                <h2>{about}</h2>
                                {age&& gender &&<p>{age + ', ' +gender}</p>}
                            </div>
                            <div >
                                <button className="mx-2 btn btn-active btn-primary btn-sm">Reject</button>
                                <button className="mx-2 btn btn-active btn-secondary btn-sm">Accept</button>
                            </div>
                        </div>
                    })}
                </div>
            )}
        </div>
    )
}

export default Requests