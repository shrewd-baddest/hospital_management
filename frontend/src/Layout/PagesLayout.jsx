import React from 'react'
import { Outlet } from 'react-router-dom'
import Headers from '../Navigations/Headers'
import SideBars from '../Navigations/SideBars'
import Footers from '../Navigations/Footers'
const PagesLayout = () => {
  return (
    <div className='mb-0'>
      <Headers />
      <div className='flex flex-row gap-4 '>
      <SideBars className='mb-0' />
      <Outlet />
      </div>
        <Footers />
    </div>
  )
}

export default PagesLayout