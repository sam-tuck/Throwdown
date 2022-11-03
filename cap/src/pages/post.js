import React, {useState} from 'react';
import Dropdown from '../pageSections/dropdown';
import {Link} from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from 'axios';
import Gamedeets from '../pageSections/gameDetails';
import {useSetting} from "../context/setting";


function Post() {
 
 const { handleLogout } = useAuth();
 const [date, setDate] = useState();
 const [addinfo, setAddinfo] = useState();
 
 
 const {gametype, system, ruleset, systype, gamesinfo, setGamesinfo} = useSetting();
 
 function handleEvent(e) {
     e.preventDefault();

     axios.post("http://localhost:4000/user/addgame", {
        gametype,
        system,
        ruleset,
        systype,
        date,
        addinfo,
     })
 }
 function updateEvent(e) {
    e.preventDefault();
    axios.post("http://localhost:4000/user/update", {
       gametype,
       playset: system,
       ruleset,
       systype,
       booktime: date,
       addinfo,
       idgames: gamesinfo.idgames,
    })
    setGamesinfo({gametype, playset: system, ruleset, systype, booktime: date, addinfo, idgames: gamesinfo.idgames});
}
function deleteEvent(e) {
    e.preventDefault();
    axios.post("http://localhost:4000/user/delete", {
      idgames: gamesinfo.idgames,
    })
    setGamesinfo({idgames: 1, gametype: "Start of list", playset: "Press up to continue", ruleset: "Back won't work", systype: "glhf", booktime: "2022-09-08", addinfo: null, idusers: 1 })
}
// search own games posted
function idUp() {
    axios.post("http://localhost:4000/user/changedeetsup", {
        idgames: (gamesinfo.idgames + 1),
    }).then((Response) => {
        if (Response.data === "") {
       setGamesinfo({idgames: 1, gametype: "Start of list", playset: "Press up to continue", ruleset: "Back won't work", systype: "glhf", booktime: "2022-09-08", addinfo: null, idusers: 1 });
    } else {
        setGamesinfo(Response.data);
}});
}

function idDown() {
    axios.post("http://localhost:4000/user/changedeetsdown", {
    idgames: (gamesinfo.idgames - 1),
}).then((Response) => {
   setGamesinfo(Response.data);
});
}


  return (
    <div>
        <header>
        <h1>Throw down</h1>
        <h2>Get your game on!</h2>
        <ul id="nav"> 
            <li className='nav'><Link to="/" onClick={handleLogout}>Logout</Link></li>      
            <li className='nav'><Link to="/user/page">Game Finder</Link></li>
            <li className='nav'><Link to="/user/post">Post</Link></li>     
        </ul>
    </header>
    
    <div className="flex">
        <span className='content'>
            <form >
            <Dropdown />
                <input type="date" id="date" className='type'
                 value={date} onChange={(e) => setDate(e.target.value)}></input>
                <textarea name="details" id="details" cols="30" rows="7" placeholder="Extra info"
                 value={addinfo} onChange={(e) => setAddinfo(e.target.value)}></textarea>
                <br></br>
                <button id="submit" type="submit" onClick={handleEvent}>Book Game</button>
            </form>
        </span>

        <button className="navBtn" id="left" disabled={gamesinfo.idgames === 1} onClick={idDown}><i className="fa-solid fa-left-long"></i></button>
        <span className='content'>
             <Gamedeets/>
             <p className='type'>These are your games. Update or delete them on the right</p>
        </span>

        <button className="navBtn" id="right" onClick={idUp}><i className="fa-solid fa-right-long"></i></button>
        
        <span className='content'>
            <form action="post" >
                <Dropdown/>
                <input type="date" id="date" className='type'
                 value={date} onChange={(e) => setDate(e.target.value)}></input>
                <textarea name="details" id="details" cols="30" rows="7" placeholder="Extra info"
                 value={addinfo} onChange={(e) => setAddinfo(e.target.value)}></textarea>
                 <br></br>
                <button id="submit" type="submit" onClick={updateEvent}>Uptate</button>
                <button id="submit" type="submit" onClick={deleteEvent}>Delete</button>
            </form>
        </span>
    </div>
       
    </div>
  )


}

export default Post