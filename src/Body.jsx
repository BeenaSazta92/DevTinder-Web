import React from 'react'
import NavBar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export const Body = () => {
  return (
    <div>
        <NavBar/>
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body
