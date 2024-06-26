import Task from './../../models/Task.js'
import Util from './../../models/Util.js'

export default async function UpdateTask(req, res) {
    const task = new Task();
    const util = new Util();

    // Grab inputs
    const {taskId,task_title,task_description,task_status,task_due_date,task_priority,task_category,task_tags} = req.body;

    console.log(req.body)

    // Ensure taskId is not null or undefined
    if (!taskId) {
        return res.status(400).send({ error: 'taskId is required' });
    }

    // Ensure there is no harmful syntax
    const title = task_title ? util.sanitizeInput(task_title) : task_title;
    const description = task_description ? util.sanitizeInput(task_description) : task_description;
    const priority = task_priority ? util.sanitizeInput(task_priority) : task_priority;

    console.log(task_tags)

    // Perform update through Supabase
    const result = await task.UpdateTask(title,description,task_status,task_due_date,priority,task_category,task_tags,taskId);

    // Return result to client for further processing
    res.send(result);
}