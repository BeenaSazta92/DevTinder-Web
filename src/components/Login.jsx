import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {addUser} from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {

  const [emailId, setEmailId]= useState(""); // create state
  const [password, setPassword] = useState("");
  const dispatch = useDispatch() // useDispatch is a hook given by redux to store data in redux
  const navigate = useNavigate();//hook for navigate user=== provided by react router dom
  const [error, SetError] = useState();
  const handelLogin = async ()=>{
    try{
      const user = await axios.post(`${BASE_URL}login`,{
        emailId,
        password
      },{withCredentials:true} // need to set this to get and set token in cookies // read documenetion once
      )
      dispatch(addUser(user?.data))
      return navigate('/')
    }catch (err){
      console.log('error =======',err)
      SetError(err?.response?.data || 'Invalid Creddentials')
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center ">Login</h2>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email ID</legend>
              <input 
                type="text"
                value={emailId}
                className="input"
                placeholder="Enter Your Email Id"
                onChange={(e)=>setEmailId(e.target.value)}// as soon input value is changing , chnagimg variable value its known as binding your state variable to ur ui component 
                />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value ={password}
                className="input"
                placeholder="********"
                onChange={(e)=>setPassword(e.target.value)}
                />
            </fieldset>
          </div>
          {error&& (
            <div>
              <p className='text-red-500'>{error}</p>
            </div>
          )} 
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handelLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login