import { useState } from 'react'
import './index.css'
import { BrowserRouter,Routes, Route} from 'react-router-dom'
import { Body } from './Body'
import Profile from './profile'
import Login from './login'
function App() {

  return (
    <>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Body/>}>
        {/* below are child route inside body component
          to render children route
          parent render children route in outlet
        */}
          <Route path ='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
        </Route> 
      </Routes>
    </BrowserRouter>
    <h1 className='text-3xl font-bold'>Hello World</h1>
    </>
  )
}

export default App
