import Auth from './../models/Auth.js';
import Util from './../models/Util.js'

export default async function SignIn(req, res) {
    const auth = new Auth();
    const util = new Util();

    // Grab inputs
    const {user_name,user_surname,user_email,user_password} = req.body;

    // Ensure there is no harmful syntax
    const name = util.sanitizeInput(user_name);
    const surname = util.sanitizeInput(user_surname);
    const emailAddress = util.sanitizeInput(user_email);
    const password = util.sanitizeInput(user_password);

    // Perform sign up through Supabase
    const result = await auth.signUp(name,surname,emailAddress,password);

    // Return result to client for further processing
    res.send(result);
}