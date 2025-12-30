import { BuildingStorefrontIcon, MagnifyingGlassCircleIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline'
import axios from 'axios';
import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'

const Departments = () => {
    const departmentData=useLoaderData();
    const [departments,setDepartments]=useState(departmentData)
    const navigate=useNavigate();
    const [search,setSearch]=useState();
axios.post('http://localhost:3000/webpages/departmentSearch',{search},{
    headers:{Authorization:`Bearer ${localStorage.getItem('item')}`}
}).then(res=>{
    setDepartments(res.data);
})

  return (
    <div>
<section>
    <h1>Departments</h1>
    <p>Manage and view an overview of all hospital departments</p>

    <div className='grid grid-rows-1 gap-4'>
        <input type="search" placeholder={`${<MagnifyingGlassCircleIcon className='inline w-4 h-4'/>} Search departments...`} 
        onChange={(e)=>setSearch(e.target.value)}/>
    <input type="button" value='+ Add New Department' className='text-lg font-semibold text-white bg-blue-600'/>
    </div>
    
</section>

<section> 

    {
Array.isArray(departments)&&departments.map((item,idx)=>(
    <div id={idx} className='grid grid-cols-1 transition duration-500 hover:skew-x-1'>
<h1 className='text-xl font-bold'>{item.name}</h1>
<h4 className='flex flex-row gap-1'><UserIcon className='inline w-4 h-4'/> Head:{item.head}</h4>
<h4 className='flex flex-row gap-1'><UserGroupIcon className='inline w-4 h-4'/> Staff:{item.staff}</h4>
<h4 className='flex flex-row gap-1'><BuildingStorefrontIcon className='inline w-4 h-4'/>Beds:{item.Bed}</h4>
    </div>
   
))

    }
<div className="flex flex-col gap-[8%]">
        <input type="button" value="Edit" onclick={navigate('/addDepartments')}/>
        <input type="button" value="view" onclick={navigate('/addDepartments')}/>
        <input type="button" value="manage users" />
    </div>
</section>

    </div>
  )
}

export default Departments

export const departments=async () => {
    try {
        const response=await fetch('http://localhost:3000/webpages/departments',
            {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            const res=await response.json();
            return res.data;
    } catch (error) {
        console.error(error.message);
    }
}