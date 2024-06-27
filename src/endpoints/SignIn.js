import Auth from './../models/Auth.js';
import Util from './../models/Util.js'

export default async function SignIn(req, res) {
    const auth = new Auth();
    const util = new Util();

    // Grab inputs
    const {user_email,user_password} = req.body;

    console.log(req.body)

    // Ensure there is no harmful syntax
    const emailAddress = util.sanitizeInput(user_email);
    const password = util.sanitizeInput(user_password);

    // Perform signin through Supabase
    const result = await auth.signIn(emailAddress,password);

    // Return result to client for further processing
    res.send(result);
}