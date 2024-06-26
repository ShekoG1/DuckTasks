import React, { useState } from 'react';
import './../style/Login.css';
import {motion} from 'framer-motion';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Event Handlers
    const login = async (event) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        // Ensure form fields are not empty
        if(email === "" || password === "") {
            alert("Please fill out all fields before submitting.");
            return;
        }

        //Disable Login button from being spammed
        event.target.disabled = true;
        event.target.innerHTML = "Logging in...";
        
        const raw = JSON.stringify({
          "user_email": email,
          "user_password": password
        });
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch(process.env.REACT_APP_API_URL+"/auth/signin", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                result = JSON.parse(result);
                /*
                    - Ideally we would use the access token from the result so that we do not expose any of the users data, but due to the time constraints of this test, I have decided to simply store the entire result JSON in order to move on to other processess
                */
                if(result.status === 200) {
                    localStorage.setItem("token", JSON.stringify(result.token));
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
            <motion.div id="login_model" initial={{scale:0}} whileInView={{scale:1}} exit={{scale:0}} transition={{duration:0.1,type:"spring",stiffness: 100}}>
                <h2 initial={{scale:0}} whileInView={{scale:1}} exit={{scale:0}} transition={{duration:0.1,type:"slide",stiffness: 100}}>LOGIN</h2>
                <p initial={{scale:0}} whileInView={{scale:1}} exit={{scale:0}} transition={{duration:0.1,type:"slide",stiffness: 100}}>Welcome back, valued user!</p>
                <div id="login_model_form">
                    <div className="forminput" initial={{scale:0}} whileInView={{scale:1}} exit={{scale:0}} transition={{duration:0.1,type:"slide",stiffness: 100}}>
                        <label>Email</label>
                        <input type="email" onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="forminput" initial={{scale:0}} whileInView={{scale:1}} exit={{scale:0}} transition={{duration:0.1,type:"slide",stiffness: 100}}>
                        <label>Password</label>
                        <div className="forminput--password">
                            <input type={showPassword ? "text" : "password"} onChange={(event) => setPassword(event.target.value)} />
                            <div className="show_hide_toggle" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? "Hide" : "Show"}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="login_buttons" initial={{scale:0}} whileInView={{scale:1}} exit={{scale:0}} transition={{duration:0.1,type:"slide",stiffness: 100}}>
                    <button id="login_buttons--btn" onClick={(event) => login(event)}>Login</button>
                    <a href="/SignUp">Or Sign Up</a>
                </div>
            </motion.div>
        </section>
    );
}

export default Login