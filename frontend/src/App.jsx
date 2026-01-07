 import React from 'react'
 import { Suspense, lazy} from 'react';
 import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
import { dashboardLoader } from './Pages/Dashboard.jsx';
import { userLoader } from './Pages/Users.jsx';
import { departments } from './Pages/Departments.jsx';
  
 
 const App = () => {
  const PagesLayout=lazy(()=>import('./Layout/PagesLayout.jsx'));
  const Accounts=lazy(()=>import('./Layout/Accounts.jsx'));
  const Login=lazy(()=>import('./Authorisation/Login.jsx'));
  const Dashboard = lazy(() => import('./Pages/Dashboard.jsx'));
  const Patients = lazy(() => import('./Pages/Patients.jsx'));
  const MedicalRecords = lazy(() => import('./Pages/MedicalRecords.jsx'));
  const Appointments = lazy(() => import('./Pages/Appointments.jsx'));
  const LabResults = lazy(() => import('./Pages/LabResults.jsx'));
  const Profile = lazy(() => import('./Pages/Profile.jsx'));
  const Billing = lazy(() => import('./Pages/Billing.jsx'));
  const WardBed = lazy(() => import('./Pages/WardBed.jsx'));
  const Settings = lazy(() => import('./Pages/Settings.jsx'));
  const Users=lazy(()=>import('./Pages/Users.jsx'));
  const Departments=lazy(()=>import('./Pages/Departments.jsx'))
  const AddDepartments=lazy(()=>import('./Pages/AddDepartment.jsx'))
  const SuspendedElement=()=>(
    <div>🍷Loading...</div>
  )

const routes= createBrowserRouter(
  createRoutesFromElements(
<>
<Route  path="/" element={<Accounts />}>
      <Route index element={<Login/>} /> 
</Route>

    <Route path ="dashboard" element={<PagesLayout />}>
      
      <Route index element={<Dashboard />} loader={dashboardLoader}/>
      <Route path="patients" element={<Patients />} loader={dashboardLoader} />
      <Route path="medicalrecords" element={<MedicalRecords />} />
      <Route path="appointments" element={<Appointments />} />
      <Route path="labresults" element={<LabResults />} />
      <Route path="profile" element={<Profile />} />
      <Route path="billing" element={<Billing />} />
      <Route path="wardbed" element={<WardBed />} />
      <Route path="users" element={<Users/>}  loader={userLoader}/>
      <Route path="settings" element={<Settings />} />
      <Route path='addDepartments' element={<AddDepartments/>}/>
      <Route path="departments" element={<Departments />} loader={departments} />
    </Route>
    </>
  )
)


   return (
     <div>
<Suspense fallback={<SuspendedElement/>}>
<RouterProvider router={routes}/>
</Suspense>

     </div>
   )
 }
 
 export default App