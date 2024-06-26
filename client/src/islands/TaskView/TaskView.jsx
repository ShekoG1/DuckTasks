import React, { useEffect, useState } from 'react';
import './TaskView.css'
import Task from '../../components/Task/Task';

function TaskView(props) {

    if (props.handleCreateTaskClick === undefined) throw new Error("TaskView is missing a required prop: handleCreateTaskClick");

    // State to hold tasks
    const [tasks, setTasks] = useState([]);
    const [rebuildTasks, setRebuildTasks] = useState(true);

    // Fetch tasks from API
    useEffect(() => {
        const fetchTasks = async () => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Access-Control-Allow-Origin","*");

            const raw = JSON.stringify({
                "uid": "7c7259a9-2266-4394-86e4-704583418da9" // This will be swopped out for a uid
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                redirect: "follow",
                body: raw
            };

            try {
                const response = await fetch("http://localhost:5000/tasks", requestOptions);
                const result = await response.json();
                console.log(result)
                
                if(result.status === 200) setTasks(result.data);
            } catch (error) {
                console.error(error);
            }

            setRebuildTasks(false);
        };

        if(rebuildTasks){
            fetchTasks()
        }
    }, [rebuildTasks]);

    // Event Handlers
    const handleTaskStatusChange = (isChecked, taskId) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "taskId": taskId,
          "task_status": isChecked
        });
        
        const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch("http://localhost:5000/tasks", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log('UPDATED',result)
            setRebuildTasks(true);
          })
          .catch((error) => console.error(error));
    }

    return (
        <div id="taskview">
            <button id='taskview_create--btn' onClick={props.handleCreateTaskClick} data-type="create">Create Task</button>
            <div id="task_list">
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        complete={task.status}
                        id={task.id}
                        onChange={(event)=>handleTaskStatusChange(event.target.checked,task.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default TaskView;
