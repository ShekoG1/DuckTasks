import React, { useState } from 'react';
import UpsertTask from './../islands/UpsertTask/UpsertTask';
import TaskView from '../islands/TaskView/TaskView';

const Home = () => {
  const [createTask, setCreateTask] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  // Handlers
  const handleCreateTaskClick = (event) => {
    let eventType = event.target.dataset.type;
    setIsUpdate(eventType === "update");
    setCreateTask(true);
  }
  const handleGoBackClick = () => {
    setCreateTask(false);
  }
  const handleUpsertTaskClick = () => {
    
  }

  return (
    <div id="home">
        {/* NAV GOES HERE */}
        {
          createTask ?
          <UpsertTask handleGoBackClick={handleGoBackClick} handleUpsertTaskClick={handleUpsertTaskClick} isUpdate={isUpdate}/> :
          <TaskView handleCreateTaskClick={handleCreateTaskClick}/>
        }
        {/* FOOTER GOES HERE */}
    </div>
  )
}

export default Home