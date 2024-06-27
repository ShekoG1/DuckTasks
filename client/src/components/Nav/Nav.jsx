import React from 'react';
import './Nav.css';
import {motion} from 'framer-motion';

function Nav() {

    // Event Handlers
    const signout = ()=>{
        localStorage.setItem("token", null);
        window.location.href = "/Login";
    }

    return (
        <nav>
            <div className="nav_menu" title='Menu not available.'>
                <span className='nav_menu--btn'>Menu</span>
            </div>
            <div className="nav_profile">
                <motion.button initial={{scale:0}} whileInView={{scale:1}} exit={{scale:0}} onClick={signout}>Sign Out</motion.button>
                <img src="/assets/profile.png" alt="Profile" className="nav_profile--img" />
            </div>
        </nav>
    )
}

export default Nav