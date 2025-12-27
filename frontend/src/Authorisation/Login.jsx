import React from 'react'
import zippy from '../assets/Images/bitch.jpg'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google'
const Login = () => {
  const [email,setEmail]=useState('');
  const [passWord,setPassword]=useState('');
 const Navigate=useNavigate();

const googleSubmit = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        const userRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        const emails = userRes.data.email;
        if (!emails) {
          alert('Google login failed: No email found');
          return;
        }
        // Only send email to backend for Google login
        axios.post('http//3000:/authorisation/login', { googleEmail: emails },{ withCredentials: true })
          .then(response => {
            if (response.data.status === 'success') {
              Navigate('/dashboard');
              localStorage.setItem('token',response.data.token);
              localStorage.setItem('role',response.data.role);
            } else {
              alert('Record does not exist');
            }
          })
          .catch(error => {
            console.error('Error during login:', error);
            alert('Login failed');
          });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  });
 
const submit=async()=>{
const formData={
  email,passWord
}
try {
 const postData= await axios.post("http//3000:/authorisation/login",formData);
 const response=await postData.data;
 if(response.status=='success'){
 localStorage.setItem('token',response.token);
Navigate('/dashboard');
 }
 else{
  alert(response.message);
 }
} catch (error) {
  console.error(error.message);
}
}


  return (
    <div className="grid min-h-screen grid-cols-2 m-4 rounded-lg bg-slate-50">
      <div className='flex flex-col items-start pb-5 pl-20'>
<h3 className='my-10 text-sm font-bold text-black '>HOSPITAL MANAGEMENT</h3>
<h1 className="mt-2 mb-4 text-4xl font-bold">Holla,<br /> Welcome Back</h1>
 
<p className='mb-16 text-sm text-teal-950'>Hey,Welcome back to your special place</p>
<div className='grid grid-cols-1 font-semibold'>
  <div>
 <label className='font-semibold'>Email:</label> 
  <input type="email" onChange={(e)=>setEmail(e.target.value)}/>
  </div>
  <div>
<label className='font-semibold'>password:</label> <input type="password" onChange={(e)=>setPassword(e.target.value)} />

  </div>
  <div>
  <input type="checkbox" />   <label className='font-semibold'>Remember me</label> 

  </div>


 <input type="Button" value='Sign in' onClick={submit} className='text-lg bg-blue-700 cursor-pointer text-cyan-100'/>
 <p className='my-8 text-sm text-center text-teal-950'>Or Sign in With</p>
  <input type="Button" value='Google' onClick={googleSubmit} className='text-lg font-bold text-black cursor-pointer bg-slate-50'/>


</div>
</div>
<div className='min-h-screen p-4 mr-1 max-w-fit'>

  <img src={zippy} alt="zippylito" className='min-h-screen cover'/>
</div>
    </div>
  )
}

export default Login