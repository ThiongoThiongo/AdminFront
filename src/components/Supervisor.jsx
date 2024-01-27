import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from './FormContainer';
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
import '../css/Agents.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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
Username,
Delete, 
  ) 
  {
    return {Id, Username,Delete};
  }
  
const Supervisor = (props) => {
      const { supervisors } = props;


      var supervisorsArray = [...supervisors];
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');
     const [selectedRegister, setSelectedRegister] = useState(false);
      var rows = [
      ];
      supervisorsArray.map((agent)=> {
        rows.push(createData(agent._id, agent.username, 'Delete'))
      })
     
        
   
     const submitHandler = async (e) => {
       e.preventDefault();
       if (password !== confirmPassword) {
         toast.error('Passwords do not match');
       } 
       else {   
         setPassword('')
         setConfirmPassword('')
         setUsername('')
        setSelectedRegister(false)
         props.onAction(username, password);
   
       }
     };
     const [showConfirmation, setShowConfirmation] =useState(false);
     const [deleteId, setDeleteId] = useState('')
     const handleClose = () => 
     {
      setShowConfirmation(false)
       setDeleteId('')
    };
    const deleteTrue = async () =>
  {
    props.onDeleteSupervisor(deleteId);
    handleClose()

  }



  return (
    <div className="centerAgent">

<div className="modal">
      <Modal
        open={showConfirmation}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are Sure You want to delete?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button  variant='danger'  className='mt-3' onClick={deleteTrue}>
               Yes
            </Button>   
            <Button  variant='light'  className='mt-3 mx-3' onClick={handleClose}>
               No
            </Button>          </Typography>
        </Box>
      </Modal>
      </div>
        <div className="agentTable">
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Delete</TableCell>
    
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.Username}</TableCell>
           
              <TableCell align="right"><Button  variant='danger'  className='mt-3' onClick={()=>{
                     setShowConfirmation(true)
                     setDeleteId(row.Id)
              }} > Delete</Button> </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
        <div className="register">
        <div className="register">
      <div className="buttonRegister">
      <ToggleButton
      className='p-0'
      value="check"
      selected={selectedRegister}
      onChange={() => {
        setSelectedRegister(!selectedRegister);
      }}
    >      { !selectedRegister ? (<><Button type='button'  variant='primary' className='mt-3' > Register Supervisior</Button>
    </>) : (<>
      <Button type='button'  variant='danger'  className='mt-3 p-0 bg-n' > <HighlightOffIcon/> </Button>
  
    </>)

    }

    </ToggleButton>
      </div>
        {selectedRegister &&       <FormContainer>
      <h4>Register Supervisor</h4>
      <Form onSubmit={submitHandler}>
        <Form.Group classuserName='my-2' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='username'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          Register
        </Button>

      </Form>


    </FormContainer>}

      </div>
        </div>

    </div>
  )
}

export default Supervisor
