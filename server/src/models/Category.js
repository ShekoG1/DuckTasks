import { createClient } from '@supabase/supabase-js';

export default class Category{

    constructor(){
        console.log ("Client is: "+process.env.DB_URL)
        this.supabase = createClient(
            process.env.DB_URL,
            process.env.DB_ANON
        );
    }

    async GetAllCategories(){
        let { data: tasks, error } = await this.supabase
        .from('tasks')
        .select(`* `)

        // Return Categories
        if(error){
            return {status:400,message:"failed",error:error};
        }
        return {status:200,message:"success",data:tasks};
    }
}