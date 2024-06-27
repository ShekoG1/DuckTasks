import React, { useState } from 'react';
import UpsertTask from './../islands/UpsertTask/UpsertTask';
import TaskView from '../islands/TaskView/TaskView';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';

const Home = () => {
  const [createTask, setCreateTask] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  //Ensure that the user is logged in before accessing other features
  if(localStorage.getItem("token") === null || localStorage.getItem("token") === "" || localStorage.getItem("token") === undefined){
    window.location.href = "/Login";
  }

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
    <section id="home">
        <Nav />
        {
          createTask ?
          <UpsertTask handleGoBackClick={handleGoBackClick} handleUpsertTaskClick={handleUpsertTaskClick} isUpdate={isUpdate}/> :
          <TaskView handleCreateTaskClick={handleCreateTaskClick}/>
        }
        <Footer />
    </section>
  )
}

export default Home