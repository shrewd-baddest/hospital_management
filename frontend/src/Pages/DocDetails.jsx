import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const DocDetails = () => {
const {id}=useParams();
const {state}=useLocation();
const url=state==='profile'?`http://localhost:3000/webpages/doctor/profile/${id}`:`http://localhost:3000/webpages/shift/${id}`;
const [profileData,setProfileData]=React.useState(null);
const schedule=profileData?.schedule || [];
var shiftData={};
useEffect(()=>{
const fetchData=async()=>{
  try{
    const res=state==='profile'?await fetch(url,{
      method:'GET',
      headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    }):
    await fetch(url,shiftData,{
      method:'POST',
      headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,
      'Content-Type':'application/json'}
    });
    const data=await res.json();
    state==='profile'?setProfileData(data):console.log(data);
  } catch(err){
    console.error(err);
  }
};
fetchData();
},[url,id,state]);
switch(state){
  case 'assign':
    //code to assign shifts
    break;
  case 'profile':
   {
    return(
        <div>
            <h1>Doctor Profile Page - ID: {id}</h1>
            <p>Display detailed information about the doctor here.</p>
            <div>
                <img src={profileData?.image} alt="" />
                <h2 className='text-lg font-bold'>{profileData?.name}</h2>
                <p>doctor</p>
            </div>
            <div>
                <h3>personal Information</h3>
                <p><strong>Department:</strong> {profileData?.department_name}</p>
                <p><strong>Name:</strong> {profileData?.name}</p>
                <p><strong>Email:</strong> {profileData?.email}</p>
                <p><strong>Phone:</strong> {profileData?.phone}</p>
                <p><strong>User Role:</strong> {profileData?.role}</p>
            </div>
            <div>
                <h3>Schedule Information</h3>

         <table>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule&&
                                schedule.map((sch,idx)=>(
                                    <tr key={idx}>
<td>{new Date(sch.schedule_date).toLocaleDateString()}</td>
                                        <td>{sch.start_time}</td>
                                        <td>{sch.end_time}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

            </div>
        </div> )
   }
  default:
    break;
}

  return (
    <div>

    </div>
  )
}

export default DocDetails

 
