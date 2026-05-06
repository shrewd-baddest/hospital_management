import {
  BriefcaseIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Regist = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [id, setId] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState("");
  const [num, setNum] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [license, setLicense] = useState("");
  const [years, setYears] = useState("");
  const [department, setDepartment] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [credentialsFile, setCredentialsFile] = useState(null);
  const [address, setAddress] = useState("");

  const registDetails = {
    name,
    gender,
    birth,
    contact,
    email,
    provider,
    num,
    role,
    password,
    id,
    license,
    years,
    department,
    address,
  };

  const submitPatient = async () => {
    if (!name || !email || !password) {
      return alert("Please fill all required fields");
    }

    if (password !== confirm) {
      return alert("Passwords do not match");
    }

    try {
      const formData = new FormData();
      // append simple fields
      Object.entries(registDetails).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value);
        }
      });

      // append files if present
      if (photoFile) {
        formData.append("photo", photoFile);
      }
      if (credentialsFile) {
        formData.append("credentials", credentialsFile);
      }
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const res = await axios.post(
        "http://localhost:3000/authorisation/register",
        formData,
      );
      console.log(res.data);
      if (res.data.message == "successful") {
        alert("Patient registered successfully");
        navigate("/dashboard");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // switch
  switch (role) {
    case "Patient":
      return (
        <div className="relative max-w-3xl p-6 mx-auto bg-white rounded shadow">
          <UserForm
            role={role}
            setRole={setRole}
            setName={setName}
            setBirth={setBirth}
            setGender={setGender}
            setId={setId}
            setContact={setContact}
            setAddress={setAddress}
            setEmail={setEmail}
            gender={gender}
          />
          <h2 className="text-lg font-bold text-black">Medical & Insurance</h2>
          <div>
            <Input
              label="Insurance Provider"
              placeholder="e.g SHA"
              onChange={(e) => setProvider(e.target.value)}
            />

            <Input
              label="Insurance Number"
              onChange={(e) => setNum(e.target.value)}
            />
          </div>
          <h2 className="text-lg font-bold text-black">Account Security</h2>
          <div>
            <Input
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              label="Confirm Password"
              type="password"
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <button
            className="p-2 mt-3 text-black bg-blue-500 rounded-md cursor-pointer hover:bg-blue-700"
            onClick={submitPatient}
          >
            Submit Registration
          </button>
        </div>
      );

    case "Nurse":
      return (
        <div className="relative max-w-3xl p-6 mx-auto bg-white rounded shadow">
          <UserForm
            role={role}
            setRole={setRole}
            setName={setName}
            setBirth={setBirth}
            setGender={setGender}
            setId={setId}
            setContact={setContact}
            setAddress={setAddress}
            setEmail={setEmail}
            gender={gender}
          />
          <h2 className="mt-4 mb-3 text-xl font-bold">
            Professional Qualifications
          </h2>
          <div>
            <label className="mt-4 font-semibold">Department</label>
            <select
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 mb-3 border"
              value={department}
            >
              <option value="">Select Department</option>
              <option value="emergency">Emergency</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="cardiology">Cardiology</option>
              <option value="general">General</option>
            </select>

            <Input
              label="Nurse License Number"
              onChange={(e) => {
                setLicense(e.target.value);
              }}
            />
            {/* <Input
              label="Years of Experience"
              onChange={(e) => setYears(e.target.value)}
            /> */}
            <label className="mt-4 font-semibold">Shift Preference</label>
            <select className="w-full p-2 mb-3 border">
              <option value="">select Shift preference</option>
              <option value="day">Day</option>
              <option value="night">Night</option>
            </select>
          </div>
          <h2 className="mt-4 mb-3 text-xl font-bold">Document Uploads</h2>
          <div>
            <label className="mt-4 mb-4 font-semibold">Upload photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
              className="block mb-4"
            />
            <label className="mt-4 font-semibold">Upload Certificate</label>
            <input
              type="file"
              onChange={(e) => setCredentialsFile(e.target.files?.[0] ?? null)}
              className="block mt-4"
            />
          </div>

          <h2 className="mt-4 mb-3 text-xl font-bold">Account Security</h2>
          <div>
            <Input
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Confirm Password"
              type="password"
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <input
            type="button"
            value="Register Nurse"
            className="p-2 mt-3 text-white bg-blue-600 rounded-lg shadow-md cursor-pointer hover:bg-blue-800 hover:cursor-pointer"
            onClick={submitPatient}
          />
        </div>
      );

    case "doctor":
      return (
        <div className="relative max-w-3xl p-6 mx-auto bg-white rounded shadow">
          <UserForm
            role={role}
            setRole={setRole}
            setName={setName}
            setBirth={setBirth}
            setGender={setGender}
            setId={setId}
            setContact={setContact}
            setAddress={setAddress}
            setEmail={setEmail}
            gender={gender}
          />
        </div>
      );
    case "receptionist":
      return (
        <div className="relative max-w-3xl p-6 mx-auto bg-white rounded shadow">
          <UserForm
            role={role}
            setRole={setRole}
            setName={setName}
            setBirth={setBirth}
            setGender={setGender}
            setId={setId}
            setContact={setContact}
            setAddress={setAddress}
            setEmail={setEmail}
            gender={gender}
          />
        </div>
      );
    case "admin":
      return (
        <div className="relative max-w-3xl p-6 mx-auto bg-white rounded shadow">
          <UserForm
            role={role}
            setRole={setRole}
            setName={setName}
            setBirth={setBirth}
            setGender={setGender}
            setId={setId}
            setContact={setContact}
            setAddress={setAddress}
            setEmail={setEmail}
            gender={gender}
          />
        </div>
      );

    default:
      return (
        <div className="flex flex-col items-center max-w-4xl gap-6 mx-auto mt-10">
          <h1 className="text-2xl font-bold">Hospital Management System</h1>
          <p>Select your role to continue</p>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            <RoleCard
              icon={UserIcon}
              title="Patient"
              onClick={() => setRole("Patient")}
            />
            <RoleCard
              icon={HeartIcon}
              title="Nurse"
              onClick={() => setRole("Nurse")}
            />
            <RoleCard
              icon={UserCircleIcon}
              title="Doctor"
              onClick={() => setRole("doctor")}
            />
            <RoleCard
              icon={BriefcaseIcon}
              title="Receptionist"
              onClick={() => setRole("receptionist")}
            />
            <RoleCard
              icon={ShieldCheckIcon}
              title="Admin"
              onClick={() => setRole("admin")}
            />
          </div>
        </div>
      );
  }
};

// 🔹 small reusable components (clean)
const Input = ({ label, ...props }) => (
  <div className="mb-3">
    <label className="block font-semibold">{label}</label>
    <input
      {...props}
      className={"w-full p-2 border rounded-md " + (props.className || "")}
    />
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

const UserForm = ({
  role,
  setRole,
  setName,
  setBirth,
  setGender,
  setId,
  setContact,
  setAddress,
  setEmail,
  gender,
}) => (
  <div>
    <button
      onClick={() => setRole("")}
      className="absolute mt-4 text-sm font-semibold hover:underline hover:cursor-pointer top-4 left-4"
    >
      Back
    </button>

    <div className="text-center">
      <h1 className="text-xl font-extrabold">{role} Registration</h1>
      <p>please fill in your details to create a patient account</p>
    </div>
    <h2 className="grid grid-cols-2 gap-[3%] font-bold text-lg text-black">
      Personal Details
    </h2>
    <div>
      <Input label="Full Name" onChange={(e) => setName(e.target.value)} />
      <Input
        label="Date of Birth"
        type="date"
        onChange={(e) => setBirth(e.target.value)}
      />

      <label className="font-semibold">Gender</label>
      <select
        onChange={(e) => setGender(e.target.value)}
        className="w-full p-2 mb-3 border"
        value={gender}
      >
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <Input
        label="National ID"
        placeholder="e.g;123-456-789"
        onChange={(e) => setId(e.target.value)}
      />
    </div>
    <h2 className="text-lg font-bold text-black">Contact Information</h2>
    <div>
      <Input
        label="Contact Number"
        onChange={(e) => setContact(e.target.value)}
      />
      <Input label="Address" onChange={(e) => setAddress(e.target.value)} />

      <Input
        label="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  </div>
);

export default Regist;
