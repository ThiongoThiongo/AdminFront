import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from './FormContainer';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/Agents.css'
import CheckIcon from '@mui/icons-material/Check';
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
  Starts,
  Ends,
  Delete,
  Assign,
  Edit,
) {
  return {Id, Username, Starts, Ends, Delete, Assign, Edit };
}


const Agents = (props) => {


const { AgentsAccount } = props;


 var agentsAccountArray = [...AgentsAccount];
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRegister, setSelectedRegister] = useState(false);
  var rows = [
  ];
  agentsAccountArray.map((agent)=> {
    rows.push(createData(agent._id, agent.username, agent.start, agent.end, 'Delete', 'Assign', 'Edit'))
  })
  
     

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } 
    else {   
      props.onAction(username, password);

      setPassword('')
      setConfirmPassword('')
      setUsername('')
     setSelectedRegister(false)

    }
  };
  const deleteTrue = async () =>
  {
    props.onDeleteAgent(deleteId);
    handleClose()

  }

   const [showConfirmation, setShowConfirmation] =useState(false);
   const [deleteId, setDeleteId] = useState('')
   const handleClose = () => 
   {
    setShowConfirmation(false)
     setDeleteId('')
  };
  const [showInterval, setShowInterval] =useState(false);
  const [startInterval, setStartInterval] = useState(0)
  const [endInterval, setEndInterval] = useState(0)
  const [intervalId, setIntervalId] = useState('')
  const handleCloseInterval = () => 
  {
   setShowInterval(false)
    setIntervalId('')
 };
 const submitIntervalHandler = (e)=> {
  e.preventDefault();
  props.onSubmitIntervalHandler(intervalId, startInterval, endInterval);
    handleCloseInterval()

 }
 const resetInterval = ()=> {
  props.onSubmitIntervalHandler(intervalId, -1);
  handleCloseInterval()

 }
 const [showEditProfile, setShowEditPofile] =useState(false);
  const [agentUsername, setAgentUsername] = useState('')
  const [agentPassword, setAgentPassword] = useState('')
  const [agentConfirmPassword, setAgentConfirmPassword] = useState('')
  const handleCloseShowProfile = () => 
  {
   setShowEditPofile(false)
 setAgentUsername('')
 setAgentPassword('')
 setAgentConfirmPassword('')
 };
 const submitEditProfileHandler = (e)=> {
  e.preventDefault();
  if (agentPassword!== agentConfirmPassword) {
    toast.error('Passwords do not match');
  } 
  else 
  {

    
  props.onSubmitEditProfileHandler(agentUsername, agentPassword, intervalId);

    handleCloseShowProfile()

  }

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
      <Modal
        open={showInterval}
        onClose={handleCloseInterval}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Assign Interval for selected Agent by picking the starting interval
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    
            <div className="div">
              <form   onSubmit={submitIntervalHandler}>
       <div className="my-2">
       <label htmlFor="start" className='mx-2'>Start Index </label>
              <input className='startInput p-1 btn-outline-info m-2 text-secondary ' placeholder='start' name='startInterval' type='number' onChange={(e)=> {
                setStartInterval(e.target.value)
              }}/>
       </div>
       <div className="my-2">
       <label htmlFor="end" className='mx-2'>End Index </label>
              <input className='startInput p-1 btn-outline-info m-2 text-secondary ' placeholder='ends' name='endInterval' type='number' onChange={(e)=> {
                setEndInterval(e.target.value)
              }}/>
       </div>
           
           <Button  variant='success' type='submit'  className='mt-3 mx-3' >
               Save
            </Button>  
            <Button  variant='light' type='button' className='mt-3 mx-3' onClick={ handleCloseInterval}>
              Cancel
            </Button>  
            <Button  variant='info' type='button' className='mt-3 mx-3' onClick={ resetInterval}>
              Reset
            </Button>                        
         </form>

              </div> 
              

                   </Typography>
        </Box>
      </Modal>
      <Modal
        open={showEditProfile}
        onClose={handleCloseShowProfile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
    <FormContainer>
      <h1>Edit Agent Profile</h1>
      <Form onSubmit={submitEditProfileHandler}>
        <Form.Group classuserName='my-2' controlId='username'>
          <Form.Label>username</Form.Label>
          <Form.Control
            type='username'
            placeholder='Enter username'
            value={agentUsername}
            onChange={(e) => setAgentUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

      
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={agentPassword}
            onChange={(e) => setAgentPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={agentConfirmPassword}
            onChange={(e) => setAgentConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Save
        </Button>
        <Button type='submit' variant='danger' onClick={handleCloseShowProfile} className='mt-3 mx-3'>
          Cancel
        </Button>

      </Form>


    </FormContainer>



      </Modal>
      </div>
      <div className="agentTable">
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='left'>Id</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Starts</TableCell>
            <TableCell align="right">Ends</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Assign</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.Id}</TableCell>
              <TableCell align="right">{row.Username}</TableCell>
              <TableCell align="right"> {row.Starts  =='' ? 'Unassigned': row.Starts} </TableCell>
              <TableCell align="right">  {row.Ends == '' ? 'Unassigned': row.Ends}</TableCell>
              <TableCell align="right"><Button  variant='danger'  className='mt-3' onClick={()=>{
                     setShowConfirmation(true)
                     setDeleteId(row.Id)
              }} > Delete</Button> </TableCell>
              <TableCell align="right"><Button  variant='success'  className='mt-3' onClick={()=>{
                     setShowInterval(true)
                    setIntervalId(row.Id)
              }} > Set Interval</Button>  </TableCell>
              <TableCell align="right"><Button  variant='info' className='mt-3' onClick={()=> {
                setShowEditPofile(true)
                setAgentUsername(row.Username)
                setIntervalId(row.Id)
              }}> Edit</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>

      <div className="register">
      <div className="buttonRegister">
      <ToggleButton
      value="check"
      selected={selectedRegister}
      onChange={() => {
        setSelectedRegister(!selectedRegister);
      }}
    >      { !selectedRegister ? (<><Button type='button'  variant='primary' className='mt-3' > Register Agent</Button>
    </>) : (<>
      <Button type='button'  variant='danger' className='mt-3' > Cancel </Button>
  
    </>)

    }

    </ToggleButton>
      </div>
        {selectedRegister &&       <FormContainer>
      <h1>Register Agent</h1>
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
  );
};

export default Agents;