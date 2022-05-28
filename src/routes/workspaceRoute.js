import React from 'react';
import DashboardSideBar from '../components/DashboardSideBar';
import { Route, Routes, Outlet } from 'react-router-dom';
import Activities from '../pages/dashboard/workspace/Activities';
import Workspace from '../pages/dashboard/workspace/Workspace';
import Chart from '../pages/dashboard/workspace/Chart';


const workspaceRoute = () => {
  return (
    <>
      <DashboardSideBar sideStyle='workspace'/>

      <div className='workspace-contain' >
        <Routes>
          <Route index element={<Workspace />} />
          <Route path="activities" element={<Activities />} />
          <Route path="chart" element={<Chart />} />
        </Routes>
        <Outlet />
      </div>
    </>
  )
}

export default workspaceRoute