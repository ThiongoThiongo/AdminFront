import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from './FormContainer';
import { toast } from 'react-toastify';
import '../css/adminProfile.css'
import { useUpdateAdminMutation} from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';

const AdminProfile = () => {
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [updateAdmin] = useUpdateAdminMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [username, setUsername] = useState(userInfo.username);
  const [phone, setPhone] = useState(userInfo.phone); 
  
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
  const id = userInfo._id
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } 
    else {   

      try {
        if(username && phone && password )
        {
          console.log(username, phone, password)
          const res = await updateAdmin({ username, password, phone , id}).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.success('Updated');
          setUsername(username)
          setPassword('')
          setConfirmPassword('')
          setUsername('')
  
        }
        else {
          toast.error('Empty Fields fill all');

        }
   
      } catch (err) {
        console.log(userInfo)

        toast.error(err?.data?.message || err.error);
      }
    

    }
  };

 
  return (
    <div className='centerAdmin'>
      <div className="centerForm">
      <FormContainer>
     <h3>Edit Admin Account</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group classuserName='my-2' controlId='username'>
          <Form.Label>username</Form.Label>
          <Form.Control
            type='username'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group classuserName='my-2' controlId='phone'>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Admin Phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>
      
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Save
        </Button>

      </Form>
      </FormContainer>
      </div>

    </div>
  )
}

export default AdminProfile
