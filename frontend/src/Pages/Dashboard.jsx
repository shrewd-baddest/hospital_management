import { BuildingStorefrontIcon, ChartBarIcon, ClipboardDocumentCheckIcon, ClipboardIcon, FunnelIcon, UserGroupIcon, UserPlusIcon } from '@heroicons/react/24/outline';
 import React from 'react'
import { useLoaderData } from 'react-router-dom';
import Linegraph from '../assets/Linegraph';

const Dashboard = () => {

// const role=localStorage.getItem('role');
 const adminData=useLoaderData();
 const role='admin';
const roleBasedDashboard=()=>{

switch(role){
case 'admin':{
  console.log(adminData);
const patients=adminData.patients;
const admissions=adminData.admissions;
const emptyBeds=adminData.Ebeds;
const occupiedBeds=adminData.Obeds;
const activities=adminData.activities;
  return(
    <div>
 <div className='flex flex-row gap-4 overflow-auto overview flex-nowrap scroll-m-0 '>
<section className='grid grid-cols-1 p-5 transition scale-50 rounded-md shadow-md min-w-fit'>
<p>Total Patients <UserGroupIcon/></p>
<h2 className='font-bold text-black'>{patients}</h2>
<p>currently adimitted or registered</p>
</section>
<section className='grid grid-cols-1 p-5 transition scale-50 rounded-md shadow-md min-w-fit'>
<p>Today Admissions <FunnelIcon/></p>
<h2 className='font-bold text-black'>{admissions}</h2>
<p>since last 24hours</p>
</section >
<section className='grid grid-cols-1 p-5 transition scale-50 rounded-md shadow-md min-w-fit'>
<p>Available Beds <BuildingStorefrontIcon/></p>
<h2 className='font-bold text-black'>{emptyBeds}</h2>
<p>Across all departments</p>
</section>
<section className='grid grid-cols-1 p-5 transition scale-50 rounded-md shadow-md min-w-fit'>
<p>Occupied Beds <ClipboardDocumentCheckIcon className='w-4 h-4'/></p>
<h2 className='font-bold text-black'>{occupiedBeds}</h2>
<p>Total currently occupied</p>
</section>
 </div>
<div>
<h4 className='font-semibold'>Admissions Trend</h4>
<p>Monthly patient admissions and discharges</p>

<Linegraph/>
</div>
<div>
  <section className='grid grid-cols-1'>
    <h4 className='font-semibold'>Quick Actions</h4>
    <button className='font-semibold text-white '>
      <UserPlusIcon className='inline w-5 h-4'/>
      <h5>Add New Patient</h5>
    </button>
    <button>
      <ClipboardIcon className='inline w-5 h-4'/>
      <h5>Schedule Appointment</h5>
    </button>
    <button>
      <ChartBarIcon className='inline w-5 h-4'/>
      <h5>View All Report</h5>
    </button>
  </section>
  <section>
    <h4 className='font-semibold'>Recent Activities</h4>
    {
activities.map((item)=>(
  <div className='flex flex-row gap-3'>
  <p>{item.time}</p>
  <p>{item.activity}</p>
  </div>
))
    }
  </section>
</div>

</div>
  )


}


}


}




  return (
    <div>{roleBasedDashboard()}</div>
  )
}

export default Dashboard


export const dashboardLoader=async()=>{
try {
  const response=await fetch('http://localhost:3000/webpages/dashboard',
   {headers:{ Authorization:`Bearer ${localStorage.getItem('token')}`}
  });
return response.json().data

} catch (error) {
  console.error(error.message);
}



}