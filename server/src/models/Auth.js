import { createClient } from '@supabase/supabase-js';

export default class Auth{

    constructor(){
        console.log ("Client is: "+process.env.DB_URL)
        this.supabase = createClient(
            process.env.DB_URL,
            process.env.DB_ANON
        );
    }

    // Signin to DUWTF
    async signIn(email = null,password = null){

        if(email === null && password === null){
            console.log("error");
            // Display SWAL
            return {status:400,message:"failed",error:"Fields cannot be null"};
        }

        const { data, error } = await this.supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

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

    // Signup to DUWTF
    async signUp(fName=null,lName=null,email=null,password=null){

        if(fName === null && lName === null && email === null && password === null){
            console.log("Fields cannot be null");
            return {status:400,message:"failed",error:"Please ensure that all fields are entered"};
        }

        // Create JSON object
        const user = {
            first_name:fName,
            last_name:lName,
            email_address:email
        }

        // Sign up
        const { data, error } = await this.supabase.auth.signUp(
            {
                email: email,
                password: password,
                options:{
                    data:{
                        first_name: fName,
                        last_name: lName,
                        email_address:email
                    }
                }
            }
        )

        // Check for any errors
        if(error){
            console.log(error);
            return {status:400,message:"failed",error:error};
        }

        return {status:200,message:"success",data:data};
    }

    async resendSignupConfirmEmail(email=null){

        if(email === null){
            return {status:400,message:"failed",error:`Email cannot be empty`};
        }

        const { data, error } = await this.supabase.auth.resend({
            type: 'signup',
            email: email,
            /*options: {
                emailRedirectTo: 'https://example.com/welcome'
            }*/
        });

        if(error){
            return {status:400,message:"failed",error:error};
        }

        return {status:200,message:"success"};
    }

    async resetPassword(email){
        const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:3000/forgot/password',
        })
    }
    async setNewPassword(newPassword){
        const { data, error } = await this.supabase.auth
        .updateUser({ password: newPassword });

        if(error){
            return {status:400,message:"failed",error:error};
        }

        return {status:200,message:"success"};
    }
    async checkUser(){
        const { data: { user } } = await this.supabase.auth.getUser();
        console.log(user);
        
        if(user == null){
            return {status:401,message:"failed",error:"unauthorized"};
        }else{
            return {status:200,message:"authorized",user:user};
        }
    }
    async deleteUser(customer_id, uid){
        const { data, error } = await this.supabase.auth.admin.deleteUser(uid);

        if(error) return {status:400,message:"failed",error:error};

        // Delete all member data and comments
        // Note: memebrs table links to comments and cascades when a member is deleted. This means that when a member is deleted, the members comments/likes are also deleted.
        const { customerError } = await this.supabase
        .from('customers')
        .delete()
        .eq('customer_id', customer_id)
        
        if(customerError) return {status:400,message:"failed",error:customerError};

        return {status:200,message:"success"};
    }
}