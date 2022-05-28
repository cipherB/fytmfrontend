import React from 'react';
import DashboardSideBar from '../components/DashboardSideBar';
import { Route, Routes, Outlet } from 'react-router-dom';
import Board from '../pages/dashboard/board/Board';
import Activities from '../pages/dashboard/board/Activities';
import Calendar from '../pages/dashboard/board/Calendar';
import Chart from '../pages/dashboard/board/Chart';
import Member from '../pages/dashboard/board/Member';

const boardRoute = () => {
  return (
    <>
      <DashboardSideBar sideStyle='board'/>

      <div className='workspace-contain' >
        <Routes>
          <Route index element={<Board />} />
          <Route path="activities" element={<Activities />} />
          <Route path="chart" element={<Chart />} />
          <Route path="members" element={<Member />} />
          <Route path="calendar" element={<Calendar />} />
        </Routes>
        <Outlet />
      </div>
    </>
  )
}

export default boardRoute