import React from 'react';
import { useCardsQuery } from '../../../services/api';
import { BoardCards } from '../../../components/Cards';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddCard from '../../../components/modals/AddCard';

const Board = () => {
  // const [filterCards, setFilterCards] = React.useState("all");
  const [closeModal, setCloseModal] = React.useState(true);
  const { data, isSuccess, isLoading } = useCardsQuery();
  const {id:boardId} = useParams();
  const intBoardId = parseInt(boardId)
  const user = JSON.parse(useSelector((state) => state.userData.user))
  const email = user.email
  // const totalCount = 0
  // if(isSuccess) {
  //   const filterCount = data.filter(function(element){
  //     return element.board === boardId;
  //   }).length
  //   totalCount += filterCount
  // }
  
  return (
    <div>
      <div className='board-cards'>
        <div className='board-cards-title'>
          <button 
            className='board-add-cards'
            onClick={()=>setCloseModal(false)}
          >Add Card</button>
          { !closeModal && <AddCard closeModal={closeModal} setCloseModal={setCloseModal} /> }
          <h2>My Cards</h2>
        </div>
        <div>
          {isLoading && <p>loading....</p>}
          <div className='board-card-contain' >
            {
              isSuccess && data.map((item, id) => item.board === intBoardId && (
                <BoardCards 
                  key={id}
                  cardId={item.id}
                  name={item.name}
                  deadline={item.deadline}
                  priority={item.priority}
                  status={item.status}
                  email={email}
                />
              ))
            }
            {/* {isSuccess && totalCount} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board