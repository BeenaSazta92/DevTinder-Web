import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserCard from './userCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    const [firstName, setFirstName]= useState(user?.firstName); // create state
    const [lastName, setLastName] = useState(user?.lastName);
    const [age, setAge]= useState(user?.age); // create state
    const [gender, setGender] = useState(user?.gender);
    const [about, setAbout] = useState(user?.about);
    const [profileUrl, setProfileUrl] = useState(user?.profileUrl);
    const dispatch = useDispatch() // useDispatch is a hook given by redux to store data in redux
    const navigate = useNavigate();//hook for navigate user=== provided by react router dom
    const [error, SetError] = useState();
    const [showToast, SetShowToast] = useState(false)
    const [loading, setLoading] = useState(false);
    const updateProfile = async () =>{
        SetError("")
        setLoading(true);
        try{
            const res = await axios.patch(`${BASE_URL}/profile/edit`,
                {
                    firstName,
                    lastName,
                    about,
                    age,
                    gender,
                    profileUrl
                },{
                    withCredentials:true
                }
            )
            dispatch(addUser(res?.data?.data))
            SetShowToast(true)
            setLoading(false)
            setTimeout(()=>{
                SetShowToast(false)
            },3000)
        }catch (err){
            SetError(err?.response?.data || 'Something went wrong')
            setLoading(false)
        }
    }
    return (
        <div className='flex justify-center my-10'>
            <div className='flex justify-center mx-10'>
                <div className="card bg-base-300 w-96 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title justify-center ">Edit profile</h2>
                        <div>
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">Email ID</legend>
                                <input 
                                    type="text"
                                    value={firstName}
                                    className="input"
                                    placeholder="Enter Your Email Id"
                                    onChange={(e)=>setFirstName(e.target.value)}// as soon input value is changing , chnagimg variable value its known as binding your state variable to ur ui component 
                                />
                            </fieldset>
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">lastName</legend>
                                <input
                                    type="text"
                                    value ={lastName}
                                    className="input"
                                    placeholder="last name"
                                    onChange={(e)=>setLastName(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">Age</legend>
                                <input
                                    type="text"
                                    value ={age}
                                    className="input"
                                    placeholder="Age"
                                    onChange={(e)=>setAge(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">Gender</legend>
                               
                                <select value={gender} className="select" onChange={(e)=>setGender(e.target.value)}>
                                    <option value="male">male</option>
                                    <option value ='female'>female</option>
                                    <option value ='others'>others</option>
                                </select>
                            </fieldset>
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">About</legend>
                                <textarea 
                                    value ={about}
                                    className="textarea"
                                    placeholder="about"
                                    onChange={(e)=>setAbout(e.target.value)}
                                ></textarea>
                            </fieldset>
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">Profile Pic</legend>
                                <input
                                    type="text"
                                    value ={profileUrl}
                                    className="input"
                                    placeholder="upload"
                                    onChange={(e)=>setProfileUrl(e.target.value)}
                                />
                            </fieldset>
                        </div>
                        {error&& (
                            <div>
                                <p className='text-red-500'>{error}</p>
                            </div>
                        )} 
                        {/* Show spinner only when loading */}
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
                            <button className="btn btn-primary" onClick={updateProfile}>Save Profile</button>
                        </div>
                    </div>
                    
                        
                    {/* <div role="alert" className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Your profile has been updated!</span>
                    </div> */}
                    {showToast&& (
                    <div className="toast toast-top toast-end">
                        <div className="alert alert-success" data-duration="3000">
                            <span>Profile Data Updated Successully</span>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <UserCard user={{firstName,lastName,age,profileUrl,about,gender}} />
        </div>
    )
}

export default EditProfile