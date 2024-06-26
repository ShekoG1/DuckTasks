import Category from './../../models/Task.js'

export default async function GetAllTasks(req, res) {
    const category = new Category();

    // Perform GET through Supabase
    const result = await category.GetAllCategories(uid);

    // Return result to client for further processing
    res.send(result);
}