import React from 'react';
import { useSelector } from 'react-redux';
import { useWorkspaceQuery } from '../services/api';
import { getInitials } from './Cards';
import { IoMdMenu } from 'react-icons/io';

const DashBoardTopBar = ({ sidebarOpen, setSidebarOpen }) => {
  const user = JSON.parse(useSelector((state) => state.userData.user))
  const { data, isLoading, isSuccess, error } = useWorkspaceQuery(user.id);
  return (
    <div className='dashboard-topbar' >
      {
          isLoading && <p>loading</p>
        }
        {
          error && <p>an error occured</p>
        }
        {
          isSuccess && 
          <div className='dashboard-contain'>
            <div className='dashboard-top-menu' >
              <IoMdMenu className='dashboard-top-menu-icon' onClick={()=>setSidebarOpen(!sidebarOpen)} />
              <div className='dashboard-top-title' >{data.name} Workspace </div>
            </div>
            <div className='dashboard-top-icon' >{getInitials(data.name)} </div>
          </div>
        }
    </div>
  )
}

export default DashBoardTopBar