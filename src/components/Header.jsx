import {Navbar, Nav, Container ,NavDropdown, Badge} from 'react-bootstrap';
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap'

import { useLogoutadminMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice'
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import Loader from './Loader';
import { useState } from 'react';
const Header = () => {
  const [logoutDone, setLogoutDone] = useState(true)


  const {userInfo} = useSelector((state)=> state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutadmin ] = useLogoutadminMutation()

   const logoutHandler = async () => {
    try {
      setLogoutDone(false)

    await logoutadmin().unwrap();
      dispatch(logout());
      setLogoutDone(true)
    } catch(err)
    {
      console.log(err)
    }
  }
  return (
    <>  {logoutDone ? 
     <header>
          <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect >
           <Container className='px-5 mx-2 py-3'>
            <LinkContainer to='/'>
              <Navbar.Brand>PeoplesLion</Navbar.Brand>
            </LinkContainer>
           
             <Navbar.Toggle aria-controls='basic-navbar-nav' />
             <Navbar.Collapse id='basic-navbar-nav'>
             <Nav className="ms-auto">
           

                   {userInfo ? (<>

                   {userInfo.type ===  'Admin' ? (<>
                   
                   <NavDropdown title={userInfo.username.toUpperCase() } id='username'>
                             
                          <LinkContainer to='/dashboard'>
                              <NavDropdown.Item>
                          
                              <AdminPanelSettingsIcon/>  Administrator Profile
                              </NavDropdown.Item>
                          </LinkContainer>
               
                 
      
                              <NavDropdown.Item onClick={logoutHandler}>
                                <LogoutIcon/>
                                Logout
                              </NavDropdown.Item>
                        </NavDropdown>    </>):(<>
                          <NavDropdown title={userInfo.username} id='username'>
                             
                             <LinkContainer to='/agentProfile'>
                                 <NavDropdown.Item>
                                   Agent Dashboard
                                 </NavDropdown.Item>
                             </LinkContainer>
   
                             
                        
                                 <NavDropdown.Item onClick={logoutHandler}>
                                   Logout
                                 </NavDropdown.Item>
                           </NavDropdown>    </>)}
                        

                   </>):(<>
                        <LinkContainer to='/login'>
                        <Nav.Link>
                        <FaSignInAlt/>
                          <span className='p-2'>Log in</span>  
                        </Nav.Link>
                        </LinkContainer>
                 
                              </>)}
              
         
      
             </Nav>
        </Navbar.Collapse>
           </Container>
          </Navbar>
    </header>
: <Loader/>
} 
</>
  )
}

export default Header
