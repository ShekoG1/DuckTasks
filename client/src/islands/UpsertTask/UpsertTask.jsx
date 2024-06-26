import React, { useEffect, useState } from 'react';

function UpsertTask(props) {
    if(props.handleGoBackClick === undefined) throw new Error("UpsertTask is missing a required prop: handleGoBackClick");
    if(props.handleUpsertTaskClick === undefined) throw new Error("UpsertTask is missing a required prop: handleUpsertTaskClick");
    if(props.isUpdate === undefined) throw new Error("UpsertTask is missing a required prop: isUpdate");
    // Only throw an error for task ID if the type is "update"
    if(props.isUpdate === true && props.taskId === undefined) throw new Error("UpsertTask is missing a required prop: taskId");

    const [categories,setCategories] = useState(null);
    // Form field state variables
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskCategory, setTaskCategory] = useState(1);
    const [taskPriority, setTaskPriority] = useState("high");

    // Fetch tasks from API
    useEffect(() => {
        const fetchCategories = async () => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Access-Control-Allow-Origin","*");

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            try {
                const response = await fetch("http://localhost:5000/category", requestOptions);
                const result = await response.json();
                console.log(result)
                
                if(result.status === 200) setCategories(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    // Event Handlers
    const createTask = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // const uid = localStorage.getItem("token").id;
        
        const raw = JSON.stringify({
          "uid": "7c7259a9-2266-4394-86e4-704583418da9",
          "task_title": taskName,
          "task_description": taskDescription,
          "task_due_date": null,
          "task_priority": taskPriority,
          "task_category": Number(taskCategory),
          "task_tags": null
        });
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch("http://localhost:5000/tasks/create", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            // Show success alert
            console.log(result)
            props.handleGoBackClick();
          })
          .catch((error) => console.error(error));
    }
    // Backlog
    /*const updateTask = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "taskId": props.taskId,
          "task_status": true,

        });
        
        const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch("http://localhost:5000/tasks", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
    }*/
    const handleSaveBtnClick = () => {
        if(props.isUpdate) {
            // updateTask()
        } else {
            createTask();
        }
    }

    return (
        <div id="upsert_task">
            <div id="tools">
                <div onClick={props.handleGoBackClick}>Back</div>
                <div>{props.isUpdate ? "Update ": "Create a"} Task</div>
            </div>
            <div id="form">
                <div className="form_left">
                    <div className="forminput">
                        <input className='textfield' type="text" onChange={(event)=>setTaskName(event.target.value)} />
                    </div>
                    <div className="forminput">
                        <textarea className='textarea' onChange={(event)=>setTaskDescription(event.target.value)}></textarea>
                    </div>
                </div>
                <div className="form_right">
                    <div className="forminput">
                        <select className='category--select' onChange={(event)=>setTaskCategory(event.target.value)}>
                            {
                                // If categoies is empty then, show "loading" text, else show the categories
                                categories != null ? (
                                    categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.category_title}
                                        </option>
                                    ))
                                ) :
                                <option disabled>Loading...</option>
                            }
                        </select>
                    </div>
                    <div className="forminput">
                        <select className='priotity--select' onChange={(event)=>setTaskPriority(event.target.value)}>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>
            </div>
            <div id="buttons">
                <button id={"buttons--save"} onClick={handleSaveBtnClick}>Save</button>
                <button id={"buttons--reset"}>Reset</button>
            </div>
        </div>
    );
}

export default UpsertTask