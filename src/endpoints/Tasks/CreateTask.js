import Task from './../../models/Task.js'
import Util from './../../models/Util.js'

export default async function CreateTask(req, res) {
    const task = new Task();
    const util = new Util();

    // Grab inputs
    const {uid,task_title,task_description,task_priority,task_category} = req.body;

    console.log(req.body)

    // Ensure there is no harmful syntax
    const title = util.sanitizeInput(task_title);
    const description = util.sanitizeInput(task_description);
    const priority = util.sanitizeInput(task_priority);

    // Perform create through Supabase
    const result = await task.CreateTask(uid,title,description,priority,task_category);

    // Return result to client for further processing
    res.send(result);
}