import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const AddDepartment = () => {
const {id}=useParams();
const {state}=useLocation();
const url=id?`http://localhost:3000/webpages/getDepartmentById/${id}`:`http://localhost:3000/webpages/addDepartment`;
const [departmentData,setDepartmentData]=useState();
useEffect(()=>{
  if(id && state==='edit'|| state==='view'){
fetch(url,{
  method:'GET',
  headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
}).then(res=>res.json()).then(data=>{
  setDepartmentData(data);
})
  } 

 
  else{
    fetch(url,{
      method:'GET',
      headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
    })    
  }


},[url,id,state])




  return (
    <div>
{state==='view' || state==='edit' ? (
  <div>
   <h4>view the department details</h4>
  </div>
) : (
  <div>
    <h1>Add Department</h1>
    <h4>Fill the form to add a new department</h4>
  </div>
)}

<form >
<section className='grid grid-cols-1 gap-4 '>
  <label htmlFor="name" className='text-lg font-semibold'>Department Name:</label>
  <input type="text" id="name" name="name" defaultValue={departmentData?.name || 'e.g Human Resources'} disabled={state==='view'?true:false}/>
</section>
<section className='grid grid-cols-1 gap-4 '>
  <label htmlFor="head" className='text-lg font-semibold'>Department Head:</label>
  <input type="text" id="head" name="head" defaultValue={departmentData?.head || 'select a head'} disabled={state==='view'?true:false}/>
</section>
<section className='grid grid-cols-1 gap-4 '>
  <label htmlFor="beds" className='text-lg font-semibold'>Number of Beds:</label>
  <input type="number" id="beds" name="beds" defaultValue={departmentData?.beds} disabled={state==='view'?true:false}/>
</section>
<section className='grid grid-cols-1 gap-4 '>
  <label htmlFor="staff" className='text-lg font-semibold'>Parent Department</label>
  <input type="text" id="staff" name="staff" defaultValue={departmentData?.staff || 'select a parent department'} disabled={state==='view'?true:false}/>
</section>
<section>
  <input type="submit" value={state==='edit'?'Update Department':'Add Department'} disabled={state==='view'?true:false}/>
</section>


</form>






    </div>
  )
}

export default AddDepartment