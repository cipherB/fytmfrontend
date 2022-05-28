import React from 'react';
import { useBoardsQuery, useWorkspaceQuery } from '../../../services/api';
import { WorkspaceBoards } from '../../../components/Cards';
import { useSelector } from 'react-redux';
import AddBoard from '../../../components/modals/AddBoard';

const Workspace = () => {
  const [closeModal, setCloseModal] = React.useState(true);
  const user = JSON.parse(useSelector((state) => state.userData.user))
  const user_id = user.id
  const email = user.email
  const { data, isLoading, isSuccess } = useBoardsQuery();
  const { data:workspaceData } = useWorkspaceQuery(user.id);
  return (
    <div >
      <div className='workspace-boards'>
        <div className='workspace-board-title'>
          <button 
            className='workspace-add-board' 
            onClick={()=>setCloseModal(false)} 
          >Add Board</button>
          { !closeModal && <AddBoard closeModal={closeModal} setCloseModal={setCloseModal} /> }
          <h2>My Boards</h2>
        </div>
        <div>
          {isLoading && <p>loading....</p>}
          <div className='workspace-board-contain' > 
            {isSuccess && data.map((item, id)=> item.workspace === workspaceData.id && (
              <WorkspaceBoards   
                key={id}
                id={item.id}
                name={item.name}
                color1={item.color_theme_2}
                color2={item.color_theme_1}
                email={email}
                workspace={item.workspace}
                workspaceUser={workspaceData.id}
              />
            ))}
          </div>
        </div>
        <div className='workspace-board-title'>
          <div>{" "} </div>
          <h2>Other Boards</h2>
        </div>
        <div>
          {isLoading && <p>loading....</p>}
          <div className='workspace-board-contain' > 
            {isSuccess && data.map((item, id)=> item.members.includes(user_id) && (
              <WorkspaceBoards   
                key={id}
                id={item.id}
                name={item.name}
                color1={item.color_theme_2}
                color2={item.color_theme_1}
                email={email}
                workspace={item.workspace}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Workspace