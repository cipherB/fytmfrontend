import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getInitials } from '../../../components/Cards';
import { BsTrash, BsPlus } from 'react-icons/bs';
import { 
  useCardQuery, 
  useUsersQuery, 
  useUpdateCardMutation, 
  useCreateActivityMutation 
} from '../../../services/api';

const Assigned = () => {
  const { id } = useParams();
  const { data:cardData, isSuccess:cardIsSuccess } = useCardQuery(id);
  const { data:usersData, isSuccess:usersIsSuccess } = useUsersQuery();
  const [ updateCard ] = useUpdateCardMutation();
  const [ createActivity ] = useCreateActivityMutation();

  const user = JSON.parse(useSelector((state) => state.userData.user))

  const denyMember = async (name, assigned, member) => {
    const memberForm = {
      id,
      name,
      assigned: assigned.filter(item => item !== member)
    }
    const activityForm = {
      user: parseInt(user.id),
      type: 'card',
      description: 'removed a member from a card'
    }
    await updateCard(memberForm);
    await createActivity(activityForm);
  }

  const assignMember = async (name, assigned, member) => {
    const addedMember = [...assigned, member]
    const memberForm = {
      id,
      name,
      assigned: addedMember
    }
    const activityForm = {
      user: parseInt(user.id),
      type: 'card',
      description: 'assigned a member to a card'
    }
    await updateCard(memberForm);
    await createActivity(activityForm);
  }
  return (
    <div>
      {cardIsSuccess && (
        <div className='card-assigned-contain' >
          <div>
            <h2>Members Assigned</h2>
            {
              usersIsSuccess && (
                <div>
                  <ul className='card-assigned-list' >
                    {
                      usersData.map((item, index)=> cardData.assigned.includes(item.id) && 
                        <li key={index} className='card-assigned-list-item' >
                          <div className='card-assigned-logo' >{getInitials(item.name)} </div>
                          <div className='member-info'>
                            <p className='member-name' >{item.name} </p>
                            <p className='member-email' > {item.email} </p>
                          </div>
                          <button 
                            className='member-btn'
                            onClick={()=> denyMember(cardData.name, cardData.assigned, item.id)}
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
          <h2>Assign New Members</h2>
            {
              usersIsSuccess && (
                <div>
                  <ul className='card-assigned-list' >
                    {
                      usersData.map((item, index)=> cardData.assigned.includes(item.id) ? null : 
                        <li key={index} className='card-assigned-list-item' >
                          <div className='card-assigned-logo' >{getInitials(item.name)} </div>
                          <div className='member-info'>
                            <p className='member-name' >{item.name} </p>
                            <p className='member-email' > {item.email} </p>
                          </div>
                          <button 
                            className='member-btn'
                            onClick={()=> assignMember(cardData.name, cardData.assigned, item.id)}
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
};

export default Assigned