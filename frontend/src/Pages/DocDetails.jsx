import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const DocDetails = () => {
const {id}=useParams();
 const url= 'http://localhost:3000/webpages/doctor/profile/${id}';
const [profileData,setProfileData]=React.useState(null);
const schedule=profileData?.schedule || [];
 useEffect(()=>{
const fetchData=async()=>{
  try{
    const res=await fetch(url,{
      method:'GET',
      headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    }) ;
    const data=await res.json();
   setProfileData(data);
  } catch(err){
    console.error(err);
  }
};
fetchData();
},[url,id]);
 

  return (
    <div>
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
<td>{sch.schedule_date}</td>
                                        <td>{sch.start_time}</td>
                                        <td>{sch.end_time}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

            </div>
        </div>
    </div>
  )
}

export default DocDetails

 
