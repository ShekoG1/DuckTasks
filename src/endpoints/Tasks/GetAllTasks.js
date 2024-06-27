import Task from './../../models/Task.js'
import Util from './../../models/Util.js'

export default async function GetAllTasks(req, res) {
    const task = new Task();
    const util = new Util();

    // Grab inputs
    const {uid} = req.body;
    
    console.log(req.body)

    // Perform GET through Supabase
    const result = await task.GetAllTasks(uid);

    // Return result to client for further processing
    res.send(result);
}