import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import * as React from 'react';
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
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const navigate = useNavigate();

    const [view, setView] = useState('agents');
    const handleChange = (event, nextView) => {
      setView(nextView);
    };

    const [agents, setAgents] = useState([])
    const [supervisors, setSupervisors] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://instacartseasonone.onrender.com/api/agentRoute/',{method:'GET',  headers: {
              'token': token
            }},{withCredentials: true
            }  );
            const fetchedData = await response.json();
            setAgents(fetchedData.data);
            console.log(agents)
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://instacartseasonone.onrender.com/api/supervisor/', {method:'GET',  headers: {
              'token': token
            }},{withCredentials: true
            } );
            var fetchedData = await response.json();
            setSupervisors(fetchedData.data);
            console.log(supervisors)
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
          const response = await axios.post('https://instacartseasonone.onrender.com/api/agentRoute/profile', {agentId, username, password},{ headers: {
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
          const response = await axios.post('https://instacartseasonone.onrender.com/api/agentRoute/profile', { agentId, start, end},{  headers: {
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
   
        const fetchData = async () => {
          try {
            const response = await axios.post('https://instacartseasonone.onrender.com/api/agentRoute/',{username, password},{  headers: {
              'token': token
            }});
           
             if(response.data.message)
             {
                console.log('hello')
                toast.success('Successfully Registered');
                const agentsTemp = [...agents];
                agentsTemp.push(response.data.agent)
                console.log(agentsTemp)
                setAgents(agentsTemp)
                console.log(agents)

             }
             else{
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
        console.log(id)
        try {
          const response = await axios.post('https://instacartseasonone.onrender.com/api/agentRoute/delete',{id }, {  headers: {
            'token': token
          }},{withCredentials: true
        });
         
           if(response.data.message)
           {
            toast.success('deletion successful')

            const agentsFilter = agents.filter((user) => user._id !== idInMind);
              console.log(agentsFilter)
              setAgents(agentsFilter)
              console.log(agentsFilter)

           }
           else{
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
      console.log(id)
      try {
        const response = await axios.post('https://instacartseasonone.onrender.com/api/supervisor/delete',{id}, {  headers: {
          'token': token
        }}, {withCredentials: true
      });
       
         if(response.data.message)
         {
          toast.success('deletion successful')

          const supervisorFilter = supervisors.filter((user) => user._id !== idInMind);
            setSupervisors(supervisorFilter)
            console.log(supervisorFilter)

         }
         else{
            toast.error('Something wwent wrong')
         }


        } catch (error) {
        console.error(error);
      }
    };

    deletingSupervisor();
  }

   const RegisterSupervisor = (username, password) =>{
   



    const fetchData = async () => {
      try {
        const response = await axios.post('https://instacartseasonone.onrender.com/api/supervisor/', {username, password},{ headers: {
          'token': token
        }},{withCredentials: true
      });
       
         if(response.data.message)
         {
            toast.success('Successfully Registered');
             const supervisorsTemp = [...supervisors];
             supervisorsTemp.push(response.data.supervisor)
             console.log(supervisorsTemp)
             setSupervisors(supervisorsTemp)
             console.log(supervisors)

         }
         else{
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
  const fetchData = async () => {
    try {

      const response = await fetch('https://instacartseasonone.onrender.com/api/instacart/',{ method:'GET', headers: {
        'token': token
      }
    },  {credentials:'include'} );
      var fetchedData = await response.json();
       
       setInstacartAccounts(fetchedData);

    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []); 

instacartArrayLength = instacartAcounts.length

   
console.log(instacartAcounts, instacartArrayLength)
const [creditAccounts, setCreditAccounts] = useState([])
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://instacartseasonone.onrender.com/api/card/',{method:'GET',  headers: {
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
      const response = await fetch('https://instacartseasonone.onrender.com/api/login/',{method:'GET',  headers: {
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

  navigate('/dashboard');
}
const calledCheckedLogin= (id, state) => {
  var instas = [...loginAccounts];
  navigate('/dashboard');
  setLoginAccounts(instas)
}
  return (
    <div className='center'>
        <div className="loader">
        {agents.length ===0 && !loaderEnd && <Loader/>}

        </div>
        <div className="left">
        <ToggleButtonGroup
      orientation="vertical"
      value={view}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="agents" aria-label="agents" className='my-2'>
        <SupervisedUserCircleIcon/> <span className='mx-2'>Agents</span> 
      </ToggleButton>
      <ToggleButton value="officer" aria-label="officer">
        <SupervisorAccountIcon/>   <span className='mx-2'>Officers</span> 
      </ToggleButton>

      <ToggleButton value="accounts" aria-label="accounts">
      <ContactPhoneIcon/><span className='mx-2'>Instacart accounts</span> 
            </ToggleButton>
      <ToggleButton value="login" aria-label="login">
        <VpnKeyIcon/>   <span className='mx-2'>Login Credentials</span> 
      </ToggleButton>
      <ToggleButton value="credit" aria-label="credit">
        <PaymentsIcon/>   <span className='mx-2'>Credit card infos</span> 
      </ToggleButton>
      <ToggleButton value="profile" aria-label="profile">
        <PaymentsIcon/>   <span className='mx-2'>Admin Profile</span> 
      </ToggleButton>

      
    </ToggleButtonGroup>
    
        </div>
       <div className="right">
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
       </div>
    </div>
  )
}

export default AdminDashboard