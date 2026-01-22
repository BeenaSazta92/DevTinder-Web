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
  const [firstName, setFirstName]= useState(""); // create state
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch() // useDispatch is a hook given by redux to store data in redux
  const navigate = useNavigate();//hook for navigate user=== provided by react router dom
  const [error, SetError] = useState();
  const [loading, setLoading] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handelLogin = async ()=>{
    setLoading(true);
    try{
      const user = await axios.post(`${BASE_URL}/login`,{
        emailId,
        password
      },{withCredentials:true} // need to set this to get and set token in cookies // read documenetion once
      )
      dispatch(addUser(user?.data?.data))
      setLoading(false)
      return navigate('/')
    }catch (err){
      setLoading(false);
      SetError(err?.response?.data || 'Invalid Creddentials')
    }
  }
  const handleSignup = async ()=>{
    setLoading(true);
    try{
      const user = await axios.post(`${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId,
          password
        },
        {withCredentials:true}
      )
      dispatch(addUser(user?.data?.data))
      return navigate('/profile')
    }catch (err){
      setLoading(false);
      setIsLoginForm(true);
      SetError(err?.response?.data || 'Signup Failed')
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center ">{isLoginForm?'Login':'Signup'}</h2>
          <div>
            {!isLoginForm && (
              <>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">First Name</legend>
                <input 
                  type="text"
                  value={firstName}
                  className="input"
                  placeholder="First Name"
                  onChange={(e)=>setFirstName(e.target.value)}// as soon input value is changing , chnagimg variable value its known as binding your state variable to ur ui component 
                  />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value ={lastName}
                  className="input"
                  placeholder="Last Name"
                  onChange={(e)=>setLastName(e.target.value)}
                  />
              </fieldset>
              </>
            )}

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
          {loading && (
            <div className="flex flex-col items-center gap-2">
                <div
                    className="radial-progress animate-spin text-primary"
                    style={{ "--value": loading, width: "4rem", height: "4rem" }}
                >
                </div>
            </div>
          )}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={()=>isLoginForm?handelLogin():handleSignup()}>{isLoginForm?'Login':'SignUp'}</button>
          </div>
          <p className='m-auto cursor-pointer p-2' onClick={()=>setIsLoginForm((value)=>!value)}>{isLoginForm?'New User? Signup Here':'Existing User? Login Here'}</p>
        </div>
      </div>
    </div>
  )
}

export default Login