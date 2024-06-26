import React from 'react';
import "./Task.css";

function Task(props) {

    if(props.title === undefined) throw new Error("Task title is undefined");
    if(props.description === undefined) throw new Error("Task description is undefined");
    if(props.complete === undefined) throw new Error("Task complete is undefined");
    if(props.id === undefined) throw new Error("Task id is undefined");
    if(props.onChange === undefined) throw new Error("Task onChange is undefined");

    return (
        <div className="task">
            <div className="task_details">
                <h3 className="task_details--title">{props.title}</h3>
                <p className="task_details--description">
                    {props.description}
                </p>
            </div>
            <div className="task_complete">
                <input className='task_complete--btn' type="checkbox" checked={props.complete} onChange={props.onChange} />
            </div>
        </div>
    );
}

export default Task