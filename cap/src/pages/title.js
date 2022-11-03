import React, {useState} from "react";
import {Link} from "react-router-dom";
import { useAuth } from "../context/auth";

function Title() {
    const {login} = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        login({username, password})
    };

    return (
        <div>
            <header>
                <h1>Throw Down</h1>
                <h2>Get your game on!</h2>
            </header>
            <Link to="/signup" classname="open">Create new account</Link>

            <form action="post" className="open">
                <input type="text" name="Username" 
                id="Username" placeholder="Username" 
                value={username} onChange={(e) => setUsername(e.target.value)} required/>

                <input type="password" name="Pasword" 
                id="Password" placeholder="Password" 
                value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <br></br>
                <input type="submit" value="Submit" onClick={handleSubmit}/>
            </form>
        </div>
    )
}
export default Title;