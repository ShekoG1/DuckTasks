import React from 'react';
import "./Task.css";
import {motion} from 'framer-motion';

function Task(props) {

    if(props.title === undefined) throw new Error("Task title is undefined");
    if(props.description === undefined) throw new Error("Task description is undefined");
    if(props.complete === undefined) throw new Error("Task complete is undefined");
    if(props.id === undefined) throw new Error("Task id is undefined");
    if(props.onChange === undefined) throw new Error("Task onChange is undefined");
    if(props.category === undefined) throw new Error("Task category is undefined");
    if(props.priority === undefined) throw new Error("Task priority is undefined");
    if(props.deleteTask === undefined) throw new Error("Task deleteTask is undefined");
    if(props.delayTransition === undefined) throw new Error("Task delayTransition is undefined");

    return (
        <motion.div className="task" initial={{scale:0}} whileInView={{scale:1}} exit={{scale:0}} transition={{duration:0.1,type:"spring",stiffness: 100,delay:props.delayTransition}}>
            <div className="task_delete" onClick={props.deleteTask} title='Delete this task'>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
            </div>
            <div className="task_details">
                <div className='task_details--badges'>
                    <span className='task_category'>{props.category}</span>
                    <span className='task_priority'>{props.priority}</span>
                </div>
                <h3 className="task_details--title">{props.title}</h3>
                <p className="task_details--description">
                    {props.description}
                </p>
            </div>
            <div className="task_complete" title='Toggle task status'>
                <input className='task_complete--btn' type="checkbox" checked={props.complete} onChange={props.onChange} />
            </div>
        </motion.div>
    );
}

export default Task