import Task from './../../models/Task.js'
import Util from './../../models/Util.js'

export default async function Delete(req, res) {
    const task = new Task();
    const util = new Util();

    // Grab inputs
    const {taskId} = req.body;

    console.log(req.body)

    // Ensure taskId is not null or undefined
    if (!taskId) {
        return res.status(400).send({ error: 'taskId is required' });
    }

    // Perform delete through Supabase
    const result = await task.DeleteTask(taskId);

    // Return result to client for further processing
    res.send(result);
}