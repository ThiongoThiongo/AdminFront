import '../css/Agents.css'
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ToggleButton from '@mui/material/ToggleButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Loader from '../components/Loader';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function createData(
  Id,
 Email, 
 Password, 
 AgentId, 
 Checked, 
 Action
) {
  return {Id, Email,Password,
    AgentId,Checked, Action };
}

const Login = (props) => {
  const { login } = props;
  const [deleteId, setDeleteId] = useState('')
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const checkedButton= async (checked)=> {
    try {
        const response = await axios.post('http://localhost:5000/api/login/update', {checked, id:deleteId},{ headers: {
          'token': token
        }});
        

         if(response.data.message)
         {
            toast.success('Successfully Updated');
           props.called(deleteId, checked)

         }
         else{
            toast.error('Something wwent wrong')
         }


        } catch (error) {
        console.error(error);
      }
}
const [timer, setTimer] = useState(false)
setTimeout(()=>{
   setTimer(true)
}, 3000)
var loginArray = [...login];
var rows = [
];
loginArray.map((cred)=> {
  rows.push(createData(cred._id, cred.email, cred.password, cred.agentId,cred.checked))
})
  

  return (
    <div className='centerAgent'>


        {loginArray.length !== 0 || timer ? (<>     <div className="agentTable">
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Password</TableCell>
            <TableCell align="right">AgentId</TableCell>
            <TableCell align="right">Checked</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.Email}</TableCell>
              <TableCell align="right"> {row.Password} </TableCell>
              <TableCell align="right">  {row.AgentId}</TableCell>
              {row.Checked ?(        
           <TableCell align="right"><CheckBoxIcon/> </TableCell>):(         <TableCell align="right"> <HighlightOffIcon/> </TableCell>)}               <TableCell align="right">  {row.AgentId}</TableCell>

              {row.Checked ? (         <TableCell align="right"><Button  variant='danger'  className='mt-3' onClick={()=>{
                     checkedButton(false)
                     setDeleteId(row.Id)
              }} >  Uncheck </Button> </TableCell>):(         <TableCell align="right"><Button  variant='success'  className='mt-3' onClick={()=>{
                checkedButton( true)
                setDeleteId(row.Id)
         }} >Check</Button> </TableCell>)}   
   
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div></>): (<>
      <Loader/>
        </>)}
   
      
    </div>
  )
}

export default Login
