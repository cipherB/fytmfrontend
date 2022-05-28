import React from 'react';
import DashboardSideBar from '../components/DashboardSideBar';
import { Route, Routes, Outlet } from 'react-router-dom';
import Card from '../pages/dashboard/card/Card';
import Attachments from '../pages/dashboard/card/Attachments';
import Activities from '../pages/dashboard/card/Activities';
import Assigned from '../pages/dashboard/card/Assigned';
import Chart from '../pages/dashboard/card/Chart';
import Comments from '../pages/dashboard/card/Comments';


const cardRoute = () => {
  return (
    <>
      <DashboardSideBar sideStyle='card'/>

      <div className='workspace-contain' >
        <Routes>
          <Route index element={<Card />} />
          <Route path="activities" element={<Activities />} />
          <Route path="attachments" element={<Attachments />} />
          <Route path="assigned" element={<Assigned />} />
          <Route path="chart" element={<Chart />} />
          <Route path="comments" element={<Comments />} />
        </Routes>
        <Outlet />
      </div>
    </>
  )
}

export default cardRoute;