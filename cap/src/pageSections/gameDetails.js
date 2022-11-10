import React, { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSetting } from "../context/setting";

import axios from "axios";




function Gamedeets() {
  
  const { gamesinfo, setGamesinfo, } = useSetting();

  useEffect(() => {
    const getGamedeets = async () => {
       axios.post(
          `http://localhost:4000/user/gamedeetsup`, {idgames: gamesinfo.idgames}
        ).then((Response) => {
          const gg = Response.data[0]           
        setGamesinfo(gg);
      });
    };
    
    getGamedeets();
  }, [setGamesinfo]);
  
  

  return (
    <>
      { gamesinfo.length === 0 ? (
        <h1 className="text-center mx-auto mt-5">No games</h1>
      ) : (
        <Card style={{ width: '18rem' }} className="type" >
           <Card.Header>{gamesinfo.gametype}</Card.Header>
                <ListGroup variant="flush">
                <ListGroup.Item>{gamesinfo.playset}</ListGroup.Item>
                <ListGroup.Item>{gamesinfo.ruleset}</ListGroup.Item>
                <ListGroup.Item>{gamesinfo.systype}</ListGroup.Item>
                <ListGroup.Item>{gamesinfo.booktime}</ListGroup.Item>
                <ListGroup.Item>{gamesinfo.addinfo}</ListGroup.Item>
                </ListGroup>
        </Card>
      )}
    </>
  );
}

export default Gamedeets;