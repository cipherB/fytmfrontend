import React from 'react';
import DashBoardTopBar from './DashBoardTopBar';
import { useDispatch } from 'react-redux';
import { logout } from '../slice/UserSlice';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';



const DashboardSideBar = ({ sideStyle }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const {id} = useParams();
  const {email} = useParams();
  const {boardId} = useParams();
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login')
  }

  const workspaceItems = [
    {
      title: "Boards",
      route: `/dashboard/${email}/workspace`
    },
    {
      title: "Activities",
      route: `/dashboard/${email}/workspace/activities`
    }
  ]
  
  const boardItems = [
    {
      title: "Cards",
      route: `/dashboard/${email}/board/${id}`
    },
    {
      title: "Workspace",
      route: `/dashboard/${email}/workspace`
    },
    {
      title: "Chart",
      route: `/dashboard/${email}/board/${id}/chart`
    },
    {
      title: "Members",
      route: `/dashboard/${email}/board/${id}/members`
    },
    {
      title: "Calendar",
      route: `/dashboard/${email}/board/${id}/calendar`
    },
    {
      title: "Activities",
      route: `/dashboard/${email}/board/${id}/activities`
    },
  ]
  
  const cardItems = [
    {
      title: "Card",
      route: `/dashboard/${email}/card/${boardId}/${id}`
    },
    {
      title: "Workspace",
      route: `/dashboard/${email}/workspace`
    },
    {
      title: "Board",
      route: `/dashboard/${email}/board/${boardId}`
    },
    {
      title: "Attachments",
      route: `/dashboard/${email}/card/${boardId}/${id}/attachments`
    },
    {
      title: "Assigned",
      route: `/dashboard/${email}/card/${boardId}/${id}/assigned`
    },
    {
      title: "Comments",
      route: `/dashboard/${email}/card/${boardId}/${id}/comments`
    },
    {
      title: "Activities",
      route: `/dashboard/${email}/card/${boardId}/${id}/activities`
    }
  ]

  const WorkpaceSideBar = () => {
    return (
      <ul className='sidebar-listings' >
        {workspaceItems.map((item, id)=> (
          <Link to={item.route} key={id} onClick={()=>setSidebarOpen(false)} >
            <li className={ location === item.route ? 'sidebar-item-active' : 'sidebar-item'} >
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
    )
  }
  
  const BoardSideBar = () => {
    return (
      <ul className='sidebar-listings' >
        {boardItems.map((item, id)=> (
          <Link to={item.route} key={id} onClick={()=>setSidebarOpen(false)}>
            <li key={id} className={ location === item.route ? 'sidebar-item-active' : 'sidebar-item'} >
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
    )
  }
  
  const CardSideBar = () => {
    return (
      <ul className='sidebar-listings' >
        {cardItems.map((item, id)=> (
          <Link to={item.route} key={id} onClick={()=>setSidebarOpen(false)}>
            <li key={id} className={ location === item.route ? 'sidebar-item-active' : 'sidebar-item'} >
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  return (
    <>
      <DashBoardTopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div 
        className={sidebarOpen ? "sidebar-close-back" : "disable-sidebar-close-back"} 
        onClick={()=>setSidebarOpen(!sidebarOpen)}
      ></div>
      <div className={sidebarOpen ? "dashboard-sidebar" : "dashboard-sidebar-close"} >
        <div>
          <AiOutlineClose className='sidebar-close' onClick={()=>setSidebarOpen(!sidebarOpen)} />
          <div className='dashboard-logo'>
            <h1>FYTM</h1>
          </div>
          <div>
            {
              sideStyle === 'workspace' ? <WorkpaceSideBar /> :
              sideStyle === 'board' ? <BoardSideBar /> :
              sideStyle === 'card' ? <CardSideBar /> : null
            }
          </div>
          <div>
            <button onClick={logoutHandler} className='sidebar-logout' >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardSideBar