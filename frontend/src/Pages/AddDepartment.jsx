import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const AddDepartment = () => {
const {id}=useParams();
const {state}=useLocation();
const url=id?`http://localhost:3000/webpages/getDepartmentById/${id}`:`http://localhost:3000/webpages/addDepartment`;
const [departmentData,setDepartmentData]=React.useState(null);
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


    </div>
  )
}

export default AddDepartment