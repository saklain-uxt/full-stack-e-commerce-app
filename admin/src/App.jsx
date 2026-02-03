

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import { useState,useEffect } from 'react'
import List from './pages/List'
import Orders from './pages/Orders'
import { Routes,Route } from 'react-router-dom'
import Login from './components/Login'
import  { Toaster } from 'react-hot-toast';


 export const backendUrl=import.meta.env.VITE_BACKEND_URL
 export const currency=import.meta.env.VITE_CURRENCY

const App = () => {
  // const [token,setToken]=useState('');
  // console.log(token);


   const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : " ",
    
  );
  console.log("my token"+token)
  // const storedUser=(localStorage.getItem("token"));
  // console.log(storedUser)

  useEffect(() => {
    localStorage.setItem("token", token);
    console.log("after login"+token);
  }, [token]);



  




  return (
   
    <div className='bg-gray-50 min-h-screen'>
      <Toaster />

     {
      token === "" ? <Login setToken={setToken}/>:
      <>
      <Navbar setToken={setToken}  />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List  token={token}  />} />
                <Route path='/orders' element={<Orders  token={token} />} />
              </Routes>
            </div>
          </div>
      
      
      </>

     }
    
      
    </div>
  )
}

export default App
