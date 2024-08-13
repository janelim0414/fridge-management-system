import React from "react";
import { googleLogout } from '@react-oauth/google';

function Header(props) {
    function logOut() {
        googleLogout();
        props.setUser(null);
    }
    return (
        <div className="flex place-content-between my-2.5 mx-7">
            <h1 className="text-3xl text-orange-400 font-bold">
                CookIt
            </h1>
            {props.user ? 
            <div className="flex">
                <h1 className="text-xl self-center"> 
                    Hello,  
                </h1>
                <h1 className="ml-2 mr-4 text-xl self-center">
                    {props.user.name}!
                </h1>
                <button className="text-l text-white bg-orange-400 rounded-xl w-20 h-10" onClick={()=>logOut()}>
                    Logout
                </button> 
            </div>:
            <br></br>}
        </div>

        
    );
}

export default Header;