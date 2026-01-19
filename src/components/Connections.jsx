import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store)=>store.connections)
    const fetchConnections =  async ()=>{
        try{
            const res = await axios.get(`${BASE_URL}/user/connections`,{
                withCredentials:true
            })
            dispatch(addConnections(res?.data?.data))
        }catch(err){
            console.log('error ',err)
        }
    }

    useEffect(()=>{
        fetchConnections();
    },[])
    if(!connections) return

    return (
        <div className='flex justify-center my-10'>
            {connections.length===0? (
                <h1 className='text-bold text-2xl'>No Connections</h1>
            ):(
                <div className="justify-center gap-4">
                    <h1 className='text-bold text-3xl text-white'>Connections</h1>
                    {connections.map((connection,i)=>{
                        const {firstName,lastName,profileUrl,age,gender,about} = connection
                        return <div key={i} className="flex rounded-lg bg-base-300 p-4 m-4 w 1/2 mx-auto">
                            <div>
                                <img className = 'w-20 h-20 rounded-full' alt='photo' src={profileUrl} /></div>
                            <div className='text-left mx-4'>
                                <h2 className='font-bold text-xl'>{firstName + " "+ lastName} </h2>
                                <h2>{about}</h2>
                                {age&& gender &&<p>{age + ', ' +gender}</p>}
                            </div>
                        </div>
                    })}
                </div>
            )}
        </div>
    )
}

export default Connections