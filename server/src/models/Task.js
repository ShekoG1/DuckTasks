import { createClient } from '@supabase/supabase-js';

export default class Task{

    constructor(){
        console.log ("Client is: "+process.env.DB_URL)
        this.supabase = createClient(
            process.env.DB_URL,
            process.env.DB_ANON
        );
    }

    async GetAllTasks(uid){

        if(uid === null){
            return {status:400,message:"failed",error:"Fields cannot be null"};
        }

        // Select all user tasks an related categories
        let { data: tasks, error } = await this.supabase
        .from('tasks')
        .select(`
            *,
            categories (
                id,category_title
            )
        `)
        .eq('uid',uid);

        // Return task
        if(error){
            return {status:400,message:"failed",error:error};
        }
        return {status:200,message:"success",data:tasks};
    }

    async CreateTask(uid,title,description,due_date,priority,category,tags){

        if(uid === null && title === null && status === null && priority === null && category === null){
            console.log("error","CreateTask: Fields cannot be null");
            return {status:400,message:"failed",error:"Fields cannot be null"};
        }

        // Validate necessary inputs
        if(tags != null && tags.tags == undefined){
            return {status:400,message:"failed",error:"Tags is not in JSON format"};
        }
        if (typeof category != 'number'){
            return {status:400,message:"failed",error:"Category is not a number"};
        }
        if(priority != "high" && priority != "medium" && priority != "low"){
            return {status:400,message:"failed",error:"Priority does not match any of the options"};
        }

        const { data, error } = await this.supabase
        .from('tasks')
        .insert([
          {
            uid: uid,
            title: title,
            description: description,
            status: 0,
            due_date: due_date,
            priority: priority,
            category: category,
            tags: tags
          },
        ])
        .select()

        // Check if the signin was successful
        if(error){
            console.log(error);
            // Display SWAL
            return {status:400,message:"failed",error:error};
        }else{
            console.log('success');
            return {status:200,message:"success",token:data};
        }
    }

    async UpdateTask(uid, title, description, due_date, priority, category, tags, taskId) {
        // At least one value must be updated
        if (uid === null && title === null && description === null && due_date === null && priority === null && category === null && tags === null) {
            console.log("error", "UpdateTask: Fields cannot be null");
            return { status: 400, message: "failed", error: "Fields cannot be null" };
        }

        // Validate necessary inputs
        if (tags != null && tags.tags == undefined) {
            return { status: 400, message: "failed", error: "Tags is not in JSON format" };
        }
        if (category != null && typeof category != 'number') {
            return { status: 400, message: "failed", error: "Category is not a number" };
        }
        if (priority != null && priority != "high" && priority != "medium" && priority != "low") {
            return { status: 400, message: "failed", error: "Priority does not match any of the options" };
        }

        // Only add changed fields to update
        const updates = {};
        if (title !== null) updates.title = title;
        if (description !== null) updates.description = description;
        if (due_date !== null) updates.due_date = due_date;
        if (priority !== null) updates.priority = priority;
        if (category !== null) updates.category = category;
        if (tags !== null) updates.tags = tags;

        // Run update
        const { data, error } = await this.supabase
            .from('tasks')
            .update(updates)
            .eq('id', taskId)
            .select();

        // Check if the update was successful
        if (error) {
            console.log(error);
            return { status: 400, message: "failed", error: error };
        } else {
            console.log('success');
            return { status: 200, message: "success", data: data };
        }
    }

    async DeleteTask(taskId) {
        // Validate necessary inputs
        if (taskId === null) {
            return { status: 400, message: "failed", error: "Fields cannot be null" };
        }

        // Run delete
        const { data, error } = await this.supabase
            .from('tasks')
            .delete()
            .eq('id', taskId)
            .select();

        if (error) {
            console.log(error);
            return { status: 400, message: "failed", error: error };
        } else {
            console.log('success');
            return { status: 200, message: "success", data: data };
        }
    }
}