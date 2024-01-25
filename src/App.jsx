import Home from './screens/Home';
import { Container } from 'react-bootstrap';
import { Outlet  } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from './slices/instaSlice';
import { useGetInstaAccountsMutation } from './slices/instasApiSlice';
import { useState, useEffect } from 'react';
import {toast} from 'react-toastify'

const App = () => {

 
  return (
    <div className='body'>

    <Header/>
       <ToastContainer />
    <div className='center'>
     <Container >
     <Outlet/>
      </Container>
      </div>
    </div>
  )
}

export default App;