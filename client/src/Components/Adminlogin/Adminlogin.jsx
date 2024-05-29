import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {TextField,Button} from '@mui/material'
import './Adminlogin.css'
import axios from 'axios'
import { apiConfig } from '../../apiConfig';
import Cookie from 'js-cookie'
import { formProvider } from '../../context/FormContextProvider';
const Adminlogin = () => {
const[user,setUser]=useState({
  username:'',
  password:''
});
const handleChange=(e)=>{
  const {name,value}=e.target;
  setUser({...user,[name]:value})
  console.log(user);
}
const{admin,setAdmin}=formProvider();

const handlelogin=async()=>{
  try{
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
  const {data}=await  axios.post(apiConfig.api_login,user,config)
  toast.success("Login SuccesFull")
  localStorage.setItem("user",JSON.stringify(data.data));
  setAdmin(data.data);
  handleData();
  }catch(e){
    console.log(e);
  }
}
const handleData=async()=>{
  try{
     const config = {
         headers: {
           Authorization: `Bearer ${admin.token}`,
           
         }};
     const {data}=axios.get(apiConfig.get_category,config);
     console.log(data)
  }catch(e){
  console.log(e);
  }
}

  return (
    <div className='mainDiv active'>
        <div className='glassMain'>
            <div className='glassMainLeft'>
                 <img src="./image/logo.png" style={{width:150,marginRight:-5}}/>
            <div className='container'>
                <p className='typed'>Forms</p>
            </div>
            <div>
              <p className='WebInfo'>Your personalized Forms Editer</p></div>
            </div>
            {
                <div className='glassMainRight'>
                    <p className=''>Admin Login</p>
                    <img src='./image/login-logo.png' width={150} style={{marginBottom:30}}></img>
                    <TextField id="outlined-basic" label="Username" name='username' variant="standard" onChange={(e)=>handleChange(e)} sx={{width:200,margin:0}}/>
                    <TextField id="outlined-basic" label="Password" name='password' variant="standard" onChange={(e)=>handleChange(e)} sx={{width:200,margin:0}}/>
                    <Button variant="outlined" style={{width:200,margin:10}} onClick={handlelogin}>Login</Button>
                </div>
            }

        </div>

    </div>
  )
}

export default Adminlogin