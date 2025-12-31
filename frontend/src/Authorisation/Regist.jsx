import {
  BriefcaseIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Regist = () => {
  const navigate = useNavigate();

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
   const [license,setLicense]=useState('');
  const [years,setYears]=useState('');

const registDetails={ name,gender,birth,contact,email,provider,num,role, password,id,license,years };

  const submitPatient = async () => {
    if (!name || !email || !password) {
      return alert('Please fill all required fields');
    }

    if (password !== confirm) {
      return alert('Passwords do not match');
    }

    try {
      const res=await axios.post('http://localhost:3000/authorisation/register',registDetails );

      if(res.data=='successful'){
        alert('Patient registered successfully');
      navigate('/dashboard');}

    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  // switch
  switch (role) {

    case 'patient':
      return (
        <div className="max-w-3xl p-6 mx-auto bg-white rounded shadow">




<div className='text-center'> 
  <h1 className='text-xl font-extrabold'>Patient Registration</h1> 
  <p>please fill in your details to create a patient account</p> 
  </div>
   <h2 className='grid grid-cols-2 gap-[3%] font-bold text-lg text-black'>Personal Details</h2> 
   <div> 
             <Input label="Full Name" onChange={e => setName(e.target.value)} />
                <Input label="Date of Birth" type="date" onChange={e => setBirth(e.target.value)} />

         <label className="font-semibold">Gender</label>
          <select onChange={e => setGender(e.target.value)} className="w-full p-2 mb-3 border">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

             
         <Input label="National ID" placeholder='e.g;123-456-789' onClick={(e)=>setId(e.target.value)} />

      </div> 
      <h2 className='text-lg font-bold text-black'>Contact Information</h2> 
      <div>
                  <Input label="Contact Number" onChange={e => setContact(e.target.value)} />

                     <Input label="Email" type="email" onChange={e => setEmail(e.target.value)} />
                </div>
                 <h2 className='text-lg font-bold text-black'>Medical & Insurance</h2> 
                 <div> 
                               <Input label="Insurance Provider" placeholder='e.g SHA' onChange={e => setProvider(e.target.value)} />

                            <Input label="Insurance Number" onChange={e => setNum(e.target.value)} />

                         </div>
     <h2 className='text-lg font-bold text-black'>Account Security</h2> 
     <div> 
             <Input label="Password" type="password" onChange={e => setPassword(e.target.value)} />

                  <Input label="Confirm Password" type="password" onChange={e => setConfirm(e.target.value)} />
 
          </div> 
          <button className='text-black bg-blue-500 rounded-md cursor-pointer hover:bg-blue-700' onClick={submitPatient}> Submit Registration </button>

       
        </div>
      );

    case 'nurse':
      return(
        <div>
          <h1>Patient Registration</h1>
          <p>please fill out the form below to register as a nurse in our system</p>
          <div>
          <Input label="Full Name" onChange={e => setName(e.target.value)} />
          <Input label="Date of Birth" type="date" onChange={e => setBirth(e.target.value)} />
              <label className="font-semibold">Gender</label>
          <select onChange={e => setGender(e.target.value)} className="w-full p-2 mb-3 border" >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <Input label='National ID' onChange={(e)=>setId(e.target.value)} />

          </div>
<h1>Contact Details</h1>
<div>

<Input label='Contact Number' onChange={(e)=>setContact(e.target.value)} />
          <Input label="Email" type="email" onChange={e => setEmail(e.target.value)} />
</div>
<h1>Professional Qualifications</h1>
<div>
<label>Department</label>
    <select onChange={e => setGender(e.target.value)} className="w-full p-2 mb-3 border" >
            <option value="" selected>Select Department</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
     <Input label='Nurse License Number' onChange={(e)=>{setLicense(e.target.value)}}/>
     <Input label='Years of Experience' onChange={(e)=>setYears(e.target.value)}/>
     <label>Shift Preference</label>
     <select >
<option >select Shift preference</option>
<option value="day">Day</option>
<option value="Night">Night</option>
     </select>
          </div>
          <h1>Document Uploads</h1>
          <div>
            <label >Upload photo</label>
            <input type="image" />
            <label >Upload Credentials</label>
            <input type="file" name="" id="" />
          </div>

          <h1>Account Security</h1>
          <div>
            <Input label='Password' onChange={(e)=>setPassword(e.target.value)}/>
                      <Input label="Confirm Password" type="password" onChange={e => setConfirm(e.target.value)} />


          </div>

<input type="button" value="Register Nurse" className='bg-blue-600 cursor-pointer hover:bg-blue-800'/>
        </div>
        
      )
    case 'doctor':
    case 'receptionist':
    case 'admin':
      return (
        <div className="mt-10 text-center">
          <h2 className="text-xl font-bold">{role} registration coming soon</h2>
          <button
            onClick={() => setRole('')}
            className="mt-4 text-blue-600 underline"
          >
            Back
          </button>
        </div>
      );

    default:
      return (
        <div className="flex flex-col items-center max-w-4xl gap-6 mx-auto mt-10">
          <h1 className="text-2xl font-bold">Hospital Management System</h1>
          <p>Select your role to continue</p>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            <RoleCard icon={UserIcon} title="Patient" onClick={() => setRole('patient')} />
            <RoleCard icon={HeartIcon} title="Nurse" onClick={() => setRole('nurse')} />
            <RoleCard icon={UserCircleIcon} title="Doctor" onClick={() => setRole('doctor')} />
            <RoleCard icon={BriefcaseIcon} title="Receptionist" onClick={() => setRole('receptionist')} />
            <RoleCard icon={ShieldCheckIcon} title="Admin" onClick={() => setRole('admin')} />
          </div>
        </div>
      );
  }
};

// 🔹 small reusable components (clean)
const Input = ({ label, ...props }) => (
  <div className="mb-3">
    <label className="block font-semibold">{label}</label>
    <input {...props} className="w-full p-2 border rounded" />
  </div>
);

const RoleCard = ({ icon: Icon, title, onClick }) => (
  <div
    onClick={onClick}
    className="p-6 transition border shadow-md cursor-pointer rounded-xl hover:scale-95"
  >
    <Icon className="w-6 h-6 mb-2" />
    <h2 className="font-semibold">{title}</h2>
  </div>
);

export default Regist;
