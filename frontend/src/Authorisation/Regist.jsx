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

  const [role, setRole] = useState('');
  const [confirm, setConfirm] = useState('');

  // 🔹 minimal patient-only state
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [provider, setProvider] = useState('');
  const [num, setNum] = useState('');
  const [password, setPassword] = useState('');

  const submitPatient = async () => {
    if (!name || !email || !password) {
      return alert('Please fill all required fields');
    }

    if (password !== confirm) {
      return alert('Passwords do not match');
    }

    try {
      await axios.post('http://localhost:3000/authorisation/register', {
        name,
        gender,
        birth,
        contact,
        email,
        provider,
        num,
        role: 'patient',
        password
      });

      alert('Patient registered successfully');
      navigate('/dashboard');

    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  // 🔥 CLEAN SWITCH (render only)
  switch (role) {

    case 'patient':
      return (
        <div className="max-w-3xl p-6 mx-auto bg-white rounded shadow">
          <h1 className="mb-4 text-xl font-bold">Patient Registration</h1>

          <Input label="Full Name" onChange={e => setName(e.target.value)} />
          <Input label="Date of Birth" type="date" onChange={e => setBirth(e.target.value)} />

          <label className="font-semibold">Gender</label>
          <select onChange={e => setGender(e.target.value)} className="w-full p-2 mb-3 border">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <Input label="Contact Number" onChange={e => setContact(e.target.value)} />
          <Input label="Email" type="email" onChange={e => setEmail(e.target.value)} />
          <Input label="Insurance Provider" onChange={e => setProvider(e.target.value)} />
          <Input label="Insurance Number" onChange={e => setNum(e.target.value)} />
          <Input label="Password" type="password" onChange={e => setPassword(e.target.value)} />
          <Input label="Confirm Password" type="password" onChange={e => setConfirm(e.target.value)} />

          <button
            onClick={submitPatient}
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Register Patient
          </button>
        </div>
      );

    case 'nurse':
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
