import React from 'react';

const UpsertTask = () => {
    
  return (
    <div id="upsert_task">
        <div id="tools">
            <div onClick={(event) => window.location.href = "/home"}>Back</div>
            <div>Create a Task</div>
        </div>
        <div id="form">
            <div className="form_left">
                <div className="forminput">
                    <input className='textfield' type="text" />
                </div>
                <div className="forminput">
                    <textarea className='textarea'></textarea>
                </div>
            </div>
            <div className="form_right">
                <div className="forminput">
                    <select className='category--select'>
                        <option value=""></option>
                    </select>
                </div>
                <div className="forminput">
                    <select className='priotity--select'>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpsertTask