import { useState } from 'react'
import './index.css'
import { BrowserRouter,Routes, Route} from 'react-router-dom'
import { Body } from './components/Body'
import Profile from './components/Profile'
import Login from './components/Login'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'
function App() {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body/>}>
          {/* below are child route inside body component
            to render children route
            parent render children route in outlet
          */}
            <Route path ='/' element={<Feed />} />
            <Route path ='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
          </Route> 
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
