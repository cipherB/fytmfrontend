import React from 'react';
import { 
  useCardQuery, 
  useChecklistsQuery, 
  useUpdateChecklistMutation, 
  useCreateActivityMutation 
} from '../../../services/api';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getInitials } from '../../../components/Cards';
import { BsPlusCircleFill } from 'react-icons/bs';
import AddChecklist from '../../../components/modals/AddChecklist';

const Card = () => {
  const {id} = useParams();
  const [checkAdd, setCheckAdd] = React.useState(false)
  const { data:cardData, isSuccess:cardIsSuccess } = useCardQuery(id);
  const { data: checklistData, isSuccess:checklistIsSuccess } = useChecklistsQuery();
  const [ updateChecklist ] = useUpdateChecklistMutation();
  const [ createActivity ] = useCreateActivityMutation();

  const user = JSON.parse(useSelector((state) => state.userData.user))

  const handleCheck = async (id, title, status) => {
    const checkForm = {
      id,
      title,
      status
    }
    const activityForm = {
      user: parseInt(user.id),
      type: 'card',
      description: status ? "checked a task" : "unchecked a task"
    }
    await updateChecklist(checkForm);
    await createActivity(activityForm)
  }

  return (
    <div>
      {cardIsSuccess && (
        <div>
          <div className='card-header' >
            <div className='card-header-sectionA'>
              <div className='card-avatar'>
                {getInitials(cardData.name)}
              </div>
            </div>
            <div className='card-header-sectionB'>
              <h2 className='card-page-title' >{cardData.name} </h2>
              <div>
                <p className='card-page-desc-label' >Description</p>
                <p className='card-page-desc' >{cardData.description} </p>
              </div>
            </div>
          </div>
          <div className='card-subSection'>
            <div>
              <p className='card-subSec-label' >Card Created: </p>
              <p>{cardData.created_at} </p>
            </div>
            <div>
              <p className='card-subSec-label' >Card Updated: </p>
              <p>{cardData.updated_at} </p>
            </div>
            <div>
              <p className='card-subSec-label' >Start Date: </p>
              <p>{cardData.start_date === null ? "Nil" : cardData.start_date} </p>
            </div>
            <div>
              <p className='card-subSec-label' >Deadline: </p>
              <p>{cardData.deadline === null ? "Nil" : cardData.deadline} </p>
            </div>
            <div>
              <p className='card-subSec-label' >Status: </p>
              <p>{cardData.status} </p>
            </div>
            <div>
              <p className='card-subSec-label' >Priority: </p>
              <p>{cardData.priority} </p>
            </div>
          </div>
          <div>
            <h2>Tasks</h2>
            {
              checklistIsSuccess && (
                <div>
                  {
                    checklistData.map((item, index) => item.card === parseInt(id) && (
                      <div key={index} className="checklist-listing" >
                        <input 
                          checked={item.status} 
                          type="checkbox" 
                          className='checklist-box'
                          onChange={()=> handleCheck(item.id, item.title, !(item.status))} 
                        />
                        <p className={item.status && "checklist-checked"} >{item.title} </p>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
      )}
      <BsPlusCircleFill  className='checklist-add' onClick={()=>setCheckAdd(true)} />
      <AddChecklist 
        checkAdd={checkAdd}
        setCheckAdd={setCheckAdd}
      />
    </div>
  )
}

export default Card