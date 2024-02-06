import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Button } from 'react-bootstrap';

import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PaymentsIcon from '@mui/icons-material/Payments';
import Agents from '../components/Agents';
import LoginInfo from '../components/LoginInfo';
import InstacartAccounts from '../components/InstacartAccounts';
import AdminProfile from '../components/AdminProfile';
import Credit from '../components/Credit';
import '../css/AdminDashboarsd.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Supervisor from '../components/Supervisor';
import { useNavigate } from 'react-router-dom';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import {
  useWindowSize,

} from '@react-hook/window-size'


const AdminDashboard = () => {

    const [width] = useWindowSize()

     const [showMenu, setShowMenu] = useState(true)


  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const navigate = useNavigate();
const [loading, setLoading] = useState(false)
    const [view, setView] = useState('agents');
    const handleChange = (event, nextView) => {
      setView(nextView);
    };

    const [agents, setAgents] = useState([])
    const [supervisors, setSupervisors] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/agentRoute/',{method:'GET',  headers: {
              'token': token
            }},{withCredentials: true
            }  );
            const fetchedData = await response.json();
            setAgents(fetchedData.data);
          } catch (error) {
            console.log(error)
          }
        };
    
        fetchData();
      }, []);
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/supervisor/', {method:'GET',  headers: {
              'token': token
            }},{withCredentials: true
            } );
            var fetchedData = await response.json();
            setSupervisors(fetchedData.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);

     const [loaderEnd, setLoaderEnd] = useState(false);

     setTimeout(()=> {

      setLoaderEnd(true)
     }, 1000)


     const submitProfileHandler = (username, password, agentId)=> {
      agents.map((agent)=> {
        if(agent._id == agentId)
        {
          console.log('here', agentId)
         agent.username= username
      
        }
        console.log(agent)
})

      async function submitProfile  () {
        try {
          const response = await axios.post('http://localhost:5000/api/agentRoute/profile', {agentId, username, password},{ headers: {
            'token': token
          }},{withCredentials: true
        });
         
           if(response.data.message)
           {
            toast.success('Updated Successfully')

    
           }
           else{
              toast.error('Something wwent wrong')
           }


          } catch (error) {
          console.error(error);
        }
      }


      submitProfile()
     }



     const submitIntervalHandler = (id, star, en) =>
     {
        var goodToGo = true
        var start = parseInt(star)
        var end = parseInt(en)
        if(star === -1)
        {
             agents.map((agent)=> {
                if(agent._id === id)
                {
                  agent.start = ''
                  agent.end = ''

                }
        })
            submitInterval(id, -1, '');
            
  
        }
        else {
            if(start > instacartArrayLength )
            {
              toast.error('Change Start Index . exceeds limit')
             return;
            }
            if(end > instacartArrayLength)
            {
              toast.error('Change End Index . exceeds limit')
                return;
            }
  
              // check if start is not greater than the instaCartArryaLength
          agents.forEach((account)=> {
              if(account.start >= 0 && (account._id !== id))
              {
                  let accountStart = parseInt(account.start) ,accountEnd = parseInt(account.end) ;

                  if(accountStart === start)
                  {
                      goodToGo = false
                      toast.error('Change Start Index . Alreeady Assigned')
                      return;
                  }
                if((accountStart < start)&&  (start <= accountEnd ))
                {
                    goodToGo = false
                    toast.error('Change Start Index . Collides with end index')
                    return;

                }
             
                if(end <= accountEnd && end >= accountStart)
                {
                  goodToGo = false
                  toast.error('Change End Index . Collides with Start index')
                  return;
                }
                
             if( start == 0)
             {
              goodToGo = false
              toast.error('Change Start Index ')
              return;
             }
                if(start > end)
                {
                  goodToGo = false
                  toast.error('Change Start Index . Collides with end index')
                  return;
                }

              }
          })
          if(goodToGo)
          {
              
          if(end >= instacartArrayLength ){
             end  = instacartArrayLength
          }
        
          agents.map((agent)=> {
              if(agent._id===id)
              {
                agent.start = start.toString(),
                agent.end = end.toString()
  
              
              }
      })
       
      submitInterval(id, start, end)
          }
  
        }
      
 
       // submit to backend

       async function submitInterval  (agentId, start, end) {
        try {
          const response = await axios.post('http://localhost:5000/api/agentRoute/profile', { agentId, start, end},{  headers: {
            'token': token
          }},{withCredentials: true
        });
         
           if(response.data.message)
           {
            toast.success('Updated Successfully')


           }
           else{
              toast.error('Something wwent wrong')
           }


          } catch (error) {
          console.error(error);
        }
      }
  
       
       
     }



   const AgentRegister = (username, password) =>{
    setLoading(true)

        const fetchData = async () => {
          try {
            const response = await axios.post('http://localhost:5000/api/agentRoute/',{username, password},{  headers: {
              'token': token
            }});
           
             if(response.data.message)
             {
              setLoading(false)

                console.log('hello')
                toast.success('Successfully Registered');
                const agentsTemp = [...agents];
                agentsTemp.push(response.data.agent)
                console.log(agentsTemp)
                setAgents(agentsTemp)
                console.log(agents)

             }
             else{
              setLoading(false)

                toast.error('Something wwent wrong')
             }


            } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
    

   }

   const deleteAgent = (id)=> {
    const deletingAgent = async () => {
        const  idInMind = id
        setLoading(true)
        try {
          const response = await axios.post('http://localhost:5000/api/agentRoute/delete',{id }, {  headers: {
            'token': token
          }},{withCredentials: true
        });
         
           if(response.data.message)
           {
            setLoading(false)

            toast.success('deletion successful')

            const agentsFilter = agents.filter((user) => user._id !== idInMind);
              setAgents(agentsFilter)

           }
           else{
            setLoading(false)

              toast.error('Something wwent wrong')
           }


          } catch (error) {
          console.error(error);
        }
      };
  
      deletingAgent();
   }
   const deleteSupervisor = (id) => {
    const deletingSupervisor = async () => {
      const  idInMind = id
      setLoading(true)
      try {
        const response = await axios.post('http://localhost:5000/api/supervisor/delete',{id}, {  headers: {
          'token': token
        }}, {withCredentials: true
      });
       
         if(response.data.message)
         {
          setLoading(false)

          toast.success('deletion successful')

          const supervisorFilter = supervisors.filter((user) => user._id !== idInMind);
            setSupervisors(supervisorFilter)

         }
         else{
          setLoading(false)

            toast.error('Something wwent wrong')
         }


        } catch (error) {
        console.error(error);
      }
    };

    deletingSupervisor();
  }

   const RegisterSupervisor = (username, password) =>{
   

    setLoading(true)


    const fetchData = async () => {
      try {

        const response = await axios.post('http://localhost:5000/api/supervisor/', {username, password},{ headers: {
          'token': token
        }},{withCredentials: true
      });
       
         if(response.data.message)
         {
          setLoading(false)
            toast.success('Successfully Registered');
             const supervisorsTemp = [...supervisors];
             supervisorsTemp.push(response.data.supervisor)
             setSupervisors(supervisorsTemp)

         }
         else{
          setLoading(false)

            toast.error('Something wwent wrong')
         }


        } catch (error) {
        console.error(error);
      }
    };

    fetchData();


}
const [instacartAcounts, setInstacartAccounts] = useState([])
var instacartArrayLength ;

useEffect(() => {
  setLoading(true)
  const fetchData = async () => {
    try {
      setLoading(false)

      const response = await fetch('http://localhost:5000/api/instacart/',{ method:'GET', headers: {
        'token': token
      }
    },  {credentials:'include'} );
    
      var fetchedData = await response.json();
       
       setInstacartAccounts(fetchedData);

    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  fetchData();
}, []); 

instacartArrayLength = instacartAcounts.length

   
const [creditAccounts, setCreditAccounts] = useState([])
useEffect(() => {

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/card/',{method:'GET',  headers: {
        'token': token
      }
    }, {credentials:'include'} );
      var fetchedData = await response.json();
       setCreditAccounts(fetchedData);
  
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []); 
const [loginAccounts, setLoginAccounts] = useState([])
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login/',{method:'GET',  headers: {
        'token': token
      }
    },{credentials:'include'} );
      var fetchedData = await response.json();
       setLoginAccounts(fetchedData);
  
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []); 

const calledCheckedCard = (id, state) => {
  var instas = [...creditAccounts];

  instas.map((insta)=> {
    if(insta._id === id){
      return insta.checked = state
    }
  })
  setCreditAccounts(instas)


}
const calledCheckedLogin= (id, state) => {
  var instas = [...loginAccounts];

  console.log(instas)
  instas.map((insta)=> {
    if(insta._id === id){
      return insta.checked = state
    }
  })
  console.log(instas)
  setLoginAccounts(instas)
}

const toggleShowButton = ()=> {
  setShowMenu(!showMenu)
}
const getClassName = ()=> {

  if(width > 750)
  {
    return 'left'
  }
  else if(width < 750 && showMenu)
  {
    return 'hide'
  }
  else{
    return 'side'
  }
}
  return (


    <div className='center'>
        <div className="loader">
        {agents.length ===0 && !loaderEnd && <Loader/>}

        </div>
      

      {   width <  750 ? <>     {showMenu ? 
           
           <div className="icons"><Button
              type='button'
              variant='primary'
              className='p-2'
              onClick={()=>setShowMenu(!showMenu)}
            >
              <ListIcon/>
            </Button>
            </div>
            :   <div className="iconsDelete"> <Button
            type='button'
            variant='danger'
            className='p-2'
            onClick={()=>setShowMenu(!showMenu)}
          >
<CloseIcon/>           </Button>
</div>
}</>:<></>}
       
        
        <div  className={getClassName()} >
         
        <ToggleButtonGroup
      orientation="vertical"
      value={view}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="agents" onClick={toggleShowButton} aria-label="agents" className='my-2'>
        <SupervisedUserCircleIcon/> <span className='mx-2'>Agents</span> 
      </ToggleButton>
      <ToggleButton onClick={toggleShowButton}  value="officer" aria-label="officer">
        <SupervisorAccountIcon/>   <span className='mx-2'>Officers</span> 
      </ToggleButton>

      <ToggleButton onClick={toggleShowButton}  value="accounts" aria-label="accounts">
      <ContactPhoneIcon/><span className='mx-2'>Instacart accounts</span> 
            </ToggleButton>
      <ToggleButton onClick={toggleShowButton}  value="login" aria-label="login">
        <VpnKeyIcon/>   <span className='mx-2'>Login Credentials</span> 
      </ToggleButton>
      <ToggleButton onClick={toggleShowButton}  value="credit" aria-label="credit">
        <PaymentsIcon/>   <span className='mx-2'>Credit card infos</span> 
      </ToggleButton>
      <ToggleButton onClick={toggleShowButton}  value="profile" aria-label="profile">
        <span className='mx-2'>Admin Profile</span> 
      </ToggleButton>

      
    </ToggleButtonGroup>
    
        </div>

        {!loading ?     <div className="right">
       {}
       {(() => {
        switch(view) {
          case 'agents':
            return  <Agents onSubmitEditProfileHandler={submitProfileHandler} AgentsAccount = {agents} onAction = {AgentRegister} onDeleteAgent=  {deleteAgent} onSubmitIntervalHandler={submitIntervalHandler} />
          case 'accounts':
            return <InstacartAccounts instacart = {instacartAcounts}/>
          case 'login':
            return <LoginInfo called = {calledCheckedLogin} login = {loginAccounts}/>
          case 'credit':
            return <Credit called = {calledCheckedCard}  credit = {creditAccounts} />
          case 'profile':
        return <AdminProfile />
        case 'officer':
          return <Supervisor onAction= {RegisterSupervisor} supervisors ={supervisors} onDeleteSupervisor = {deleteSupervisor}/>
    
              default:
            return null
        }
      })()}
       </div>:<Loader/>}
   
    </div>
  )
}

export default AdminDashboard
