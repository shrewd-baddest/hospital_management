import { BriefcaseIcon, HeartIcon, ShieldCheckIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/outline'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Regist = () => {
  const [role,setRole]=useState('');
  const [name,setName]=useState('');
  const [gender,setGender]=useState('');
  const [birth,setBirth]=useState('');
  const [id,setId]=useState('');
  const [contact,setContact]=useState('');
  const [email,setEmail]=useState('');
  const [provider,setProvider]=useState('');
  const [num,setNum]=useState('');
  const [password,setPassword]=useState('');
  const [confirm,setConfirm]=useState('');

  const navigate=useNavigate();
useEffect(()=>{
switch(role){
  case('patients'):{
    const formData=new FormData();
    formData.append(name);
    formData.append(gender);
    formData.append(birth);
    formData.append(id);
    formData.append(contact);
    formData.append(email);
    formData.append(provider);
    formData.append(num);
    password==confirm? formData.append(password):alert('please enter a correct password')
 const details=async () => {
  Object.value(formData).some(item=>item.trim()==''|| item==0 && alert('please fill all the inputs'));
  const response=await axios.post('http://localhost:3000/authorisation/login',formData);
  response.data.status=='success'&& alert('successfully registered');navigate('/dashboard')
  
 }
    return(
      <>
      <div className='text-center'>
<h1 className='text-xl font-extrabold'>Patient Registration</h1>
<p>please fill in your details to create a patient account</p>
      </div>
<h2 className='grid grid-cols-2 gap-[3%] font-bold text-lg text-black'>Personal Details</h2>
      <div>
<section className='grid grid-cols-1'>
<label className='font-semibold text-md'>Full Name</label>
<input type="text" placeholder='john Doe' onChange={(e)=>setName(e.value.target)}/>

</section>
<section className='grid grid-cols-1'>
<label className='font-semibold text-md'>Date of Birth</label>
<input type="date" onChange={(e)=>setBirth(e.target.value)} />

</section>
<section className='grid grid-cols-1'>
<label className='font-semibold text-md' >Gender</label>
<select name="gender" placeholder='select gender' onSelect={e=>setGender(e.value.target)}>
  <option value="male">male</option>
  <option value="female">female</option>
</select>

</section>
<section className='grid grid-cols-1'>
 <label className='font-semibold text-md'>National ID</label>
<input type="date" placeholder='e.g;123-456-789' onClick={(e)=>setId(e.target.value)}/>

</section>

      </div>
        <h2 className='text-lg font-bold text-black'>Contact Information</h2>
      <div>
<section className='grid grid-cols-1'>
        <label className='font-semibold text-md'>Contact Number</label>
        <input type="tel"  onChange={(e)=>setContact(e.target.value)}/>
        </section>

<section className='grid grid-cols-1'>

        <label className='font-semibold text-md' >Email</label>
        <input type='email' onChange={(e)=>setEmail(e.target.value)}/>
        </section>
      </div>
      <h2 className='text-lg font-bold text-black'>Medical & Insurance</h2>
      <div>
<section className='grid grid-cols-1'>
      <label className='font-semibold text-md'>Insurance Provider</label>
      <input type="text" placeholder='e.g SHA' onChange={(e)=>setProvider(e.target.value)}/>

      </section>

<section className='grid grid-cols-1'>
        <label className='font-semibold text-md'>Insurance Number</label>
        <input type="text" onChange={(e)=>setNum(e.target.value)} />
      </section>
      </div>
            <h2 className='text-lg font-bold text-black'>Account Security</h2>
            <div>
              <section className='grid grid-cols-1'>

              <label className='font-semibold text-md' >password</label>
              <input type="password" name="password"  onChange={(e)=>{setPassword(e.target.value)}}/>
            </section>

<section className='grid grid-cols-1'>
                <label className='font-semibold text-md'>Confirm Password</label>
                <input type="password" name="password" onChange={(e)=>setConfirm(e.target.value)} />
              </section>
            </div>
<button className='text-black bg-blue-500 rounded-md cursor-pointer hover:bg-blue-700' onClick={()=>details()}>
  Submit Registration
</button>
      </>


    )
  }

  default:{
    return (
      <div className='flex items-center justify-center max-w-[70%]  border shadow-md rounded-xl bg-white'>
        <div>
          <h1 className='text-2xl font-bold'>Welcome to Our Hospital Management System!</h1>
          <p>Please select your role to proceed with the registration process</p>
        </div>
      <div className='grid grid-cols-3 gap-[4%] '>
    <section className='grid p-[5%] shadow-md shadow-black hover:scale-95 transition duration-200 max-w-[20%]' onClick={()=>setRole('patient')}>
    <UserIcon className='w-5 h-5'/>
    <h2 className='text-xl font-semibold text-black'>Patient</h2>
    <p>Register as a patient to access your medical</p>
    </section>
    
    
    <section className='grid p-[5%] shadow-md shadow-black hover:scale-95 transition duration-200 max-w-[20%]' onClick={()=>setRole('nurse')}>
    <HeartIcon className='w-5 h-5'/>
     <h2 className='text-xl font-semibold text-black'>Nurse</h2>
    <p>Join Our nursing team and manage patient</p>
    </section>
    
    
    <section className='grid p-[5%] shadow-md shadow-black hover:scale-95 transition duration-200 max-w-[20%]' onClick={()=>setRole('doctor')}>
    <UserCircleIcon className='w-5 h-5'/>
    <h2 className='text-xl font-semibold text-black'>Doctor</h2>
    <p>Register as a doctor to manage patient</p>
    </section>
    
    <section className='grid p-[5%] shadow-md shadow-black hover:scale-95 transition duration-200 max-w-[20%]' onClick={()=>setRole('receptionist')}>
    <BriefcaseIcon className='w-5 h-5'/>
     <h2 className='text-xl font-semibold text-black'>Reptionist</h2>
    <p>Manage patient check-ins</p>
    </section>
    
    
    <section className='grid p-[5%] shadow-md shadow-black hover:scale-95 transition duration-200 max-w-[20%]' onClick={()=>setRole('admin')}>
    <ShieldCheckIcon className='w-5 h-5'/>
    <h2 className='text-xl font-semibold text-black'>Admin</h2>
    <p>Gain full administrative control over the</p>
    </section>
    
        
      </div>
      </div>
    )

  }
}

},[role])
return(
  <>
  </>
)


}

export default Regist