import React from 'react';
import { useDeleteBoardMutation, useCreateActivityMutation } from '../../services/api';
import { useSelector } from 'react-redux';

const DeleteBoard = ({ deleteModal, setDeleteModal }) => {
  const [ deleteBoard ] = useDeleteBoardMutation();
  const [ createActivity ] = useCreateActivityMutation();

  const user = JSON.parse(useSelector((state) => state.userData.user))

  const handleDelete = async () => {
    const activityForm = {
      user: parseInt(user.id),
      type: 'workspace',
      description: 'deleted a board'
    }
    await deleteBoard(deleteModal);
    await createActivity(activityForm);
    setDeleteModal(null);
  }

  if(deleteModal === null) {
    return null
  }

  return (
    <div>
      <div className='modal-contain'>
        <div className='modal-shadow' onClick={()=> setDeleteModal(null)} ></div>
        <div className='modal-delete-paper'>
          <div className='modal-delete-title'>Are you sure you want to delete?</div>
          <div className='modal-delete-btn-contain'>
            <button 
              className='modal-delete-btn' 
              style={{background:"red"}} 
              onClick={handleDelete} 
            >Yes</button>
            <button 
              className='modal-delete-btn' 
              style={{background:"green"}} 
              onClick={()=> setDeleteModal(null)} 
            >Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteBoard