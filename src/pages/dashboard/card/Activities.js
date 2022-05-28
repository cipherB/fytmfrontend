import React from 'react';
import { useCardActivitiesQuery } from '../../../services/api';

const Activities = () => {
  const { data, isSuccess, isLoading } = useCardActivitiesQuery()
  return (
    <div className='activities-contain' >
      <h2 className='activities-header' >
        Activities on Card
      </h2>
      <ul className='activity-list' >
        {
          isLoading && <p>Loading ...</p>
        }
        {
          isSuccess && data.map((item, id) => (
            <li key={id} className='activity-item' >
              {item.user} {item.description} {" "}
              <span className='activity-time' >{item.created_at} </span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Activities