import React from 'react'
import { Outlet } from 'react-router-dom'
import Headers from '../Navigations/Headers'
import SideBars from '../Navigations/SideBars'
import Footers from '../Navigations/Footers'
const PagesLayout = () => {
  return (
    <div>
      <Headers />
      <SideBars />
      <Outlet />
        <Footers />
    </div>
  )
}

export default PagesLayout