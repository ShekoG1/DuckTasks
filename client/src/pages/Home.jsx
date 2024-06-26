import React from 'react';
import Task from './../components/Task/Task';
import UpsertTask from './../islands/UpsertTask/UpsertTask';

const Home = () => {
  return (
    <div id="home">
        {/* NAV GOES HERE */}
        {/* <button>Create Task</button>
        <div id="task_list">
            <Task title="Task 1" description="This is a description" complete={false} id={1} onChange={console.log} />
        </div> */}
        {/* FOOTER GOES HERE */}

        <UpsertTask/>
    </div>
  )
}

export default Home