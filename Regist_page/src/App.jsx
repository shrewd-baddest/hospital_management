 import React from 'react'
 import { Suspense, } from 'react';
 import { createBrowserRouter,createRoutesFromElements,Routes,RouterProvider } from 'react-router-dom';
 
 const App = () => {

const routes= createBrowserRouter(
  createRoutesFromElements(
    <Routes>
      
    </Routes>
  )
)


   return (
     <div>

<RouterProvider router={routes}/>


     </div>
   )
 }
 
 export default App