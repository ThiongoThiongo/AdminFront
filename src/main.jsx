import React from 'react'
import store from './store';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import AdminLogin from './screens/AdminLogin.jsx';
import Home from './screens/Home.jsx';
import AdminDashboard from './screens/AdminDashboard.jsx';
import PrivateRouteAdmin from './components/PrivateRouteAdmin.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
       <Route path='/' element={<App/>}>
               <Route index = {true} path='/' element={<Home/>} />     
              <Route index = {true} path='/login' element={<AdminLogin/>} />
               
               <Route path='' element={<PrivateRouteAdmin/>}>
              
              <Route index = {true} path='/dashboard' element={<AdminDashboard/>} />

              </Route> 
             
     
       </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
 
 <Provider store={store}>

 <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>

)
