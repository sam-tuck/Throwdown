import React, {useEffect} from "react";
import {useSetting} from "../context/setting";


function Picture () {
    const {player, setPlayer} = useSetting();
    useEffect(() => {
    }, [setPlayer]);
    
  
  return (
    <div>
    { player.pic === undefined ? (
      <img src={require("../assets/profile.jpg")} alt="player" className="photo"></img>
      ) : (
      <img src={`data:image/jpeg;base64,${player.pic}`} alt="player" className="photo"></img>
      )}
    </div>
  )
    
}
export default  Picture;