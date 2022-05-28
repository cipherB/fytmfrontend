import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { RiFlag2Fill } from 'react-icons/ri';
import { BsAlarmFill, BsThreeDots } from 'react-icons/bs';
import EditBoard from './modals/EditBoard';
import DeleteBoard from './modals/DeleteBoard';
import EditCard from './modals/EditCard';
import DeleteCard from './modals/DeleteCard';

export const WorkspaceBoards = ({ color1, color2, name, id, email, workspace, workspaceUser }) => {
  const [openPopup, setOpenPopup] = React.useState(null)
  return(
    <div className="board-card">
      <Link to={`/dashboard/${email}/board/${id}`}>
        <div className="board-card-color" style={{background:color1}} >
            <div className="board-initials" style={{background:color2, color:color1}} >
            <p>{getInitials(name)} </p>
            </div>
        </div>
      </Link>
      <div className="board-card-title-contain" >
        <h2 className="board-card-title">{name} </h2>
        {
          workspace === workspaceUser ? (
            <>
              <BsThreeDots className='board-card-menu' onClick={()=>setOpenPopup(id)} />{
                openPopup === id && (
                  <EditPopup 
                    type="board"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                  />
                )
              }
            </>
          ) : null
        }
      </div>
    </div>
  )
}

const EditPopup = ({ type, openPopup, setOpenPopup }) => {
  const [editModal, setEditModal] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(null);
  const toggleEdit = () => {
    setEditModal(openPopup);
  }
  const toggleDelete = () => {
    setDeleteModal(openPopup);
  }
  if(type==="board"){
    return (
      <div>
        <div className='modal-shadow' onClick={()=>setOpenPopup(null)} ></div>
        <div className='popup-contain'>
          <ul className='popup-items'>
            <li className='popup-item' onClick={toggleEdit} >Edit</li>
            <li className='popup-item' style={{color:"#FF0000"}} onClick={toggleDelete} >Delete</li>
          </ul>
          {
            editModal !== null && (
              <EditBoard editModal={editModal} setEditModal={setEditModal} />
            )
          }
          {
            deleteModal !== null && (
              <DeleteBoard deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
            )
          }
        </div>
      </div>
    )
  }
  if(type==="card") {
    return (
      <div>
        <div className='modal-shadow' onClick={()=>setOpenPopup(null)} ></div>
        <div className='popup-contain'>
          <ul className='popup-items'>
            <li className='popup-item' onClick={toggleEdit} >Edit</li>
            <li className='popup-item' style={{color:"#FF0000"}} onClick={toggleDelete} >Delete</li>
          </ul>
          {
            editModal !== null && (
              <EditCard editModal={editModal} setEditModal={setEditModal} />
            )
          }
          {
            deleteModal !== null && (
              <DeleteCard deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
            )
          }
        </div>
      </div>
    )
  }
}

export const BoardCards = ({ cardId, name, deadline, priority, status, email }) => {
  const {id} = useParams();
  const [openPopup, setOpenPopup] = React.useState(null)

  let statusColor;
  let priorityColor;
  switch(status){
    case "open":
      statusColor = "#FFFF00";
      break;
    case "in progress":
      statusColor = "#FF7F00";
      break;
    case "need assistance":
      statusColor = "#0000FF";
      break;
    case "on hold":
      statusColor = "#EBC334";
      break;
    case "client review":
      statusColor = "#9400D3";
      break;
    case "verify and close":
      statusColor = "#4B0082";
      break;
    case "done":
      statusColor = "#00FF00";
      break;
    default: 
      statusColor = "#808080";
      break
  }

  switch(priority) {
    case "urgent":
      priorityColor = "#EBC334";
      break;
    case "high":
      priorityColor = "#FF7403";
      break;
    case "normal":
      priorityColor = "#FFDD03";
      break;
    case "low":
      priorityColor = "#0000FF";
      break;
    case "no priority":
      priorityColor = "#808080";
      break;
    default: 
      break;
  }

  return(
    <div className='board-card'>
      <Link to={`/dashboard/${email}/card/${id}/${cardId}`} >
        <div className="cards-color" >
            <div className="card-initials" >
              <p>{getInitials(name)} </p>
            </div>
        </div>
      </Link>
      <div className="card-title-contain" >
        <div className="card-title">
          {name} 
        </div>
        <div className='board-card-items' >
          <p className='board-status' style={{background:statusColor}} >{status} </p>
          <RiFlag2Fill color={priorityColor} />
          {
            deadline !== null && <BsAlarmFill />
          }
        </div>
        <BsThreeDots className='board-card-menu-popup' onClick={()=>setOpenPopup(id)} />{
          openPopup === id && (
            <EditPopup 
              type="card"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            />
          )
        }
      </div>
    </div>
  )
}

export const getInitials = ( name="My Name" ) => {
  var names = name.split(' '), 
  initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}
