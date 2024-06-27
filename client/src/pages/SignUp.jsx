import React, { useState } from 'react';
import './../style/SignUp.css';

function SignUp() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Event Handlers
    const signup = async (event) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        // Ensure form fields are not empty
        if(email === "" || password === "" || name === "" || surname === "") {
            alert("Please fill out all fields before submitting.");
            return;
        }

        //Disable Login button from being spammed
        event.target.disabled = true;
        event.target.innerHTML = "Logging in...";
        
        const raw = JSON.stringify({
          "user_name": name,
          "user_surname": surname,
          "user_email": email,
          "user_password": password
        });
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch(process.env.REACT_APP_API_URL+"/auth/signup", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                result = JSON.parse(result);
                /*
                    - Ideally we would use the access token from the result so that we do not expose any of the users data, but due to the time constraints of this test, I have decided to simply store the entire result JSON in order to move on to other processess
                */
                if(result.status === 200) {
                    localStorage.setItem("token", result.token);
                    window.location.href = "/";
                }
                else {
                    alert("Whoops! Something went wrong. Please try again later.");
                    console.log(result)
                    // Re-enable Login button if there is an unknown errpr
                    event.target.disabled = false;
                    event.target.innerHTML = "Login";
                }
            })
            .catch((error) => {
                console.error(error)
                alert("Invalid email or password.");
                // Re-enable Login button
                event.target.disabled = false;
                event.target.innerHTML = "Login";
                return;
            });
    }

    return (
        <section id="login">
            <div id="login_model">
                <h2>SIGN UP</h2>
                <p>Join us, and complete your tasks with ease!</p>
                <div id="login_model_form">
                    <div className="forminput">
                        <label>First Name</label>
                        <input type="text" onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="forminput">
                        <label>Surname</label>
                        <input type="text" onChange={(event) => setSurname(event.target.value)} />
                    </div>
                    <div className="forminput">
                        <label>Email</label>
                        <input type="email" onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="forminput">
                        <label>Password</label>
                        <div className="forminput--password">
                            <input type={showPassword ? "text" : "password"} onChange={(event) => setPassword(event.target.value)} />
                            <div className="show_hide_toggle" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? "Hide" : "Show"}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="login_buttons">
                    <button id="login_buttons--btn" onClick={(event) => signup(event)}>Sign Up</button>
                    <a href="/Login">Or Login</a>
                </div>
            </div>
        </section>
    );
}

export default SignUp