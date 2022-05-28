import React from 'react';
import { useBoardQuery, useUsersQuery, useUpdateBoardMutation, useCreateActivityMutation } from '../../../services/api';
import { useParams } from 'react-router-dom';
import { getInitials } from '../../../components/Cards';
import { BsTrash, BsPlus } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const Member = () => {
  const { id } = useParams();
  const { data:boardData, isSuccess:boardIsSuccess } = useBoardQuery(id);
  const { data:usersData, isSuccess:usersIsSuccess } = useUsersQuery();
  const [ updateBoard ] = useUpdateBoardMutation();
  const [ createActivity ] = useCreateActivityMutation();

  const user = JSON.parse(useSelector((state) => state.userData.user))

  const removeMember = async (name, members, member) => {
    const memberForm = {
      id,
      name,
      members: members.filter(item => item !== member)
    }
    const activityForm = {
      user: parseInt(user.id),
      type: 'board',
      description: 'removed an existing member'
    }
    await updateBoard(memberForm)
    await createActivity(activityForm)
  }

  const addMember = async (name, members, member) => {
    const addedMember = [...members, member]
    const memberForm = {
      id,
      name,
      members: addedMember
    }
    const activityForm = {
      user: parseInt(user.id),
      type: 'board',
      description: 'added a new member'
    }
    await updateBoard(memberForm)
    await createActivity(activityForm)
  }

  return (
    <div>
      {boardIsSuccess && (
        <div className='board-members-contain' >
          <div>
            <h2>Members in board</h2>
            {
              usersIsSuccess && (
                <div>
                  <ul className='board-members-list' >
                    {
                      usersData.map((item, index)=> boardData.members.includes(item.id) && 
                        <li key={index} className='board-members-list-item' >
                          <div className='board-member-logo' >{getInitials(item.name)} </div>
                          <div className='member-info'>
                            <p className='member-name' >{item.name} </p>
                            <p className='member-email' > {item.email} </p>
                          </div>
                          <button 
                            className='member-btn'
                            onClick={()=> removeMember(boardData.name, boardData.members, item.id)}
                          >
                            <BsTrash />
                          </button>
                        </li>
                      )
                    }
                  </ul>
                </div>
              )
            }
          </div>
          <div>
          <h2>Members not in board</h2>
            {
              usersIsSuccess && (
                <div>
                  <ul className='board-members-list' >
                    {
                      usersData.map((item, index)=> boardData.members.includes(item.id) ? null : 
                        <li key={index} className='board-members-list-item' >
                          <div className='board-member-logo' >{getInitials(item.name)} </div>
                          <div className='member-info'>
                            <p className='member-name' >{item.name} </p>
                            <p className='member-email' > {item.email} </p>
                          </div>
                          <button 
                            className='member-btn'
                            onClick={()=> addMember(boardData.name, boardData.members, item.id)}
                          >
                            <BsPlus />
                          </button>
                        </li>
                      )
                    }
                  </ul>
                </div>
              )
            }
          </div>
        </div>
        
      )}
    </div>
  )
}

export default Member