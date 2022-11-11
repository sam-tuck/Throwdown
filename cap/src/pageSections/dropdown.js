import React, { useState, useEffect } from "react";
import {useSetting} from "../context/setting"

function Dropdown (){
 const [primary, setPrimary] = useState([])
 const [secondary,setSecondary] = useState([])
 const [tertiary,setTertiary] = useState([])
 const [penultimate,setPenultimate] = useState([])

 const {gametype, setGametype, system, setSystem,
    ruleset, setRuleset, systype, setSystype} = useSetting();


 
 


 useEffect(()=>{
    setPrimary( [
            {name: "Tabletop", secondary:["40K", "A.O.S", "Other"], tertiary:["Competetive", "Casual"],
            penultimate:["2000", "1000", "500"]},
            {name: "Cardgames", secondary:["M.T.G", "Flesh and Blood", "Other"], tertiary:["Classic", "Commander", "2.H.G"],
            penultimate:["Sealed", "Draft", "Constructed"]},
            {name: "Roleplay", secondary:["Player", "D.M."], tertiary:["Campaign", "One-shot"], penultimate:["Paid", "F2P"]},
            {name: "Boardgames", secondary:["Co-op", "Versus"], tertiary:["Head to head", "Multi-player"], penultimate:["Strategy", "4x"]},
        ]
    
    )
    
 },[]);



    function System(e) {
        setSystem( e.target.value);

    }

    function Ruleset(e) {
        setRuleset( e.target.value);
    }

    function Systype(e) {
        setSystype( e.target.value)
    }

    function Choose(e) {
        setGametype([ e.target.value]);
        setSecondary(primary.find(x=> x.name === e.target.value).secondary);
        setTertiary(primary.find(x=> x.name === e.target.value).tertiary);
        setPenultimate(primary.find(x=> x.name === e.target.value).penultimate);
    }

     
  
        return (
            <span>
                <select className="type" value={gametype} onChange={Choose}>
                    <option>--Select--</option>
                    {primary.map((x, id)=>{
                        return <option key={id}>{x.name}</option>
                    })}
                </select>
                <select className="type" value={system} onChange={System}>
                    <option>-------</option>
                    {
                        secondary.map((x, id) => {
                            return <option key={id}>{x}</option>
                        })
                    }
                </select>
                <select className="type" value={ruleset} onChange={Ruleset}>
                    <option>-------</option>
                    {
                       tertiary.map((x, id) => {
                            return <option key={id}>{x}</option>
                        })
                    }
                </select>
                <select className="type" value={systype} onChange={Systype}>
                    <option>-------</option>
                    {
                        penultimate.map((x, id) => {
                            return <option key={id}>{x}</option>
                        })
                    }
                </select>
            </span>
        )
    
}

export default Dropdown;