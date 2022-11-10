import React, { createContext, useContext, useState } from "react";

const SettingContext = createContext();
const useSetting = () => useContext(SettingContext);

function SettingProvider({children}){

    const [gametype, setGametype] = useState("");
    const [system, setSystem] = useState("");
    const [ruleset, setRuleset] = useState("");
    const [systype, setSystype] = useState("");
    const [gamesinfo, setGamesinfo] = useState({ 
        idgames: 1, gametype: "Tabletop", playset: "40K", ruleset: "Competetive", systype: "1000", booktime: "2022-09-08", addinfo: null, idusers: 1 });
    const [idgames, setIdgames] = useState(1);
    const [player, setPlayer] = useState({username: "Test", email: "test@test.com", pic: undefined});
    

    return(
        <SettingContext.Provider value={{
            gametype,
            setGametype,
            system,
            setSystem,
            ruleset,
            setRuleset,
            systype,
            setSystype,
            gamesinfo,
            setGamesinfo,
            idgames,
            setIdgames,
            player,
            setPlayer,
        }}>
            {children}
        </SettingContext.Provider>
    )
}

export{SettingProvider,useSetting}