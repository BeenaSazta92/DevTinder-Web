import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
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
