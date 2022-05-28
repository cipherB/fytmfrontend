import React from 'react';
import { useCardsQuery } from '../../../services/api';
import moment from 'moment';
import "../../../style/react-big-calendar-custom.css";
import { useParams } from 'react-router-dom';
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";

const localizer = momentLocalizer(moment)

const Calendar = () => {
  // const [dateTime, setDateTime] = React.useState([]);
  const dateTime = []
  const { data, isSuccess, isLoading } = useCardsQuery();
  const {id:boardId} = useParams();
  const intBoardId = parseInt(boardId)
  return (
    <div style={{width:600}} >
      { isLoading && <h2>Loading...</h2> }
      <div style={{display:"none"}}>
        {
          isSuccess && data.map((item) => item.board === intBoardId && dateTime.push(
            {
              start: item.deadline,
              end: item.deadline,
              title: item.name
            }
          ) )
        }
      </div>
      {isSuccess &&<div style={{ height: 700 }}>
        <BigCalendar
          style={{ height: 500, width: 700 }}
          events={dateTime}
          localizer={localizer}
          statAccessor="start"
          endAccessor="end"
        />
      </div>}
    </div>
  )
}

export default Calendar