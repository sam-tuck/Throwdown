require('dotenv').config();
const jwt = require("jsonwebtoken");
const {db} = require("../db/db");


var addGameAsync = function (req) {    
    return new Promise(function(resolve,reject){
      // decode header and extract user id
      const bearerHeader = req.headers["authorization"];
      const header = bearerHeader.split(" ");
      const token = header[1];
      const id = jwt.verify(token, process.env.TOKEN_SECRET).userData;

      let sql = `INSERT INTO games (gametype, playset, ruleset, systype, booktime, addinfo, idusers) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      db.query(sql,[req.body.gametype[0], req.body.system, req.body.ruleset, req.body.systype, req.body.date, req.body.input, id.id],
         (err, result) => {
          console.log('insert');
        if (err) {
           console.log(err.message);
           reject(err);
           return
        }
        resolve(result);
      });
    });
  };

  var updateGameAsync = function (req) {
    const bearerHeader = req.headers["authorization"];
    const header = bearerHeader.split(" ");
    const token = header[1];
    const id = jwt.verify(token, process.env.TOKEN_SECRET).userData;

    return new Promise(function(resolve,reject){
      let sql = `UPDATE games SET ? WHERE idusers = ? and idgames = ?`;
      db.query(sql,[req.body, id.id, req.body.idgames],
         (err, result) => {
          console.log('update');
        if (err) {
           console.log(err.message);
           reject(err);
           return
        }
        resolve(result);
      });
    });
  };

  var deleteGameAsync = function (req) {
    const bearerHeader = req.headers["authorization"];
    const header = bearerHeader.split(" ");
    const token = header[1];
    const id = jwt.verify(token, process.env.TOKEN_SECRET).userData;

    return new Promise(function(resolve,reject){
      let sql = `DELETE FROM games WHERE idusers = ? and idgames = ?`;
      db.query(sql,[id.id, req.body.idgames],
         (err, result) => {
          console.log('update');
        if (err) {
           console.log(err.message);
           reject(err);
           return
        }
        resolve(result);
      });
    });
  };

  //  post game finder
  var changeGameUpAsync = function (req) {
    const bearerHeader = req.headers["authorization"];
      const header = bearerHeader.split(" ");
      const token = header[1];
      const id = jwt.verify(token, process.env.TOKEN_SECRET).userData;
    // filtered to only return users games
    return new Promise(function (resolve,reject) {
      let sql = `SELECT * FROM games WHERE idusers = ? AND idgames >= ? `;
      db.query(sql,[id.id, req.body.idgames], (err, result) => {
        if (err) {
           console.log(err.message);
           reject(err);
           return
        }
        resolve(result);
      });
    });
  };

  var changeGameDownAsync = function (req) {
    const bearerHeader = req.headers["authorization"];
      const header = bearerHeader.split(" ");
      const token = header[1];
      const id = jwt.verify(token, process.env.TOKEN_SECRET).userData;

    return new Promise(function (resolve,reject) {
      let sql = `SELECT * FROM games WHERE idusers = ? AND idgames <= ? ORDER BY idgames DESC`;
      db.query(sql,[id.id, req.body.idgames], (err, result) => {
        if (err) {
           console.log(err.message);
           reject(err);
           return
        }
        resolve(result);
      });
    });
  };
  // game match finder
  var findGameUpAsync = function (req) {
    const bearerHeader = req.headers["authorization"];
      const header = bearerHeader.split(" ");
      const token = header[1];
      const id = jwt.verify(token, process.env.TOKEN_SECRET).userData;
    //  filtered to NOT return users games
    return new Promise(function (resolve,reject) {
      let sql = `SELECT * FROM games WHERE NOT idusers = ? AND idgames >= ? LIMIT 1`;
      db.query(sql,[id.id, req.body.idgames], (err, result) => {
        if (err) {
           console.log(err.message);
           reject(err);
           return
        }
        resolve(result);
      });
    });
  };

  var findGameDownAsync = function (req) {
    const bearerHeader = req.headers["authorization"];
      const header = bearerHeader.split(" ");
      const token = header[1];
      const id = jwt.verify(token, process.env.TOKEN_SECRET).userData;

    return new Promise(function (resolve,reject) {
      let sql = `SELECT * FROM games WHERE NOT idusers = ? AND idgames <= ? ORDER BY idgames DESC`;
      db.query(sql,[id.id, req.body.idgames], (err, result) => {
        if (err) {
           console.log(err.message);
           reject(err);
           return
        }
        resolve(result);
      });
    });
  };


  // check if game exists plrior to new entry
  var getGamebyDeetsAsync = function (req) {
    return new Promise(function (resolve, reject) {
      const bearerHeader = req.headers["authorization"];
      const header = bearerHeader.split(" ");
      const token = header[1];
      const id = jwt.verify(token, process.env.TOKEN_SECRET).userData;

      let sql = `SELECT * FROM games WHERE gametype = ? and playset = ? AND ruleset =? and systype = ? and booktime = ? and addinfo = ? AND idusers = ?`;
      db.query(sql,[req.body.gametype[0], req.body.system, req.body.ruleset, req.body.systype, req.body.date, req.body.input, id.id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  };

  var refineGameSearchAsync = function (req) {
    return new Promise(function (resolve, reject) {
      const bearerHeader = req.headers["authorization"];
      const header = bearerHeader.split(" ");
      const token = header[1];
      const id = jwt.verify(token, process.env.TOKEN_SECRET).userData;

      const a = req.body.system, b = req.body.ruleset, c = req.body.systype;
      const x = " and playset = ?", y = " AND ruleset =?", z = " and systype = ?";
      const sqlStringarr = ["SELECT * FROM games WHERE NOT idusers = ? AND gametype = ? AND idgames >= ?"];
      const queries = [id.id, req.body.gametype[0], req.body.idgames];
      if (!(a === "" || a === '-------')) {
         sqlStringarr.push(x);
         queries.push(a);
      }
      if (!(b === "" || b === '-------')) {
        sqlStringarr.push(y);
        queries.push(b);
      } 
      if (!(c === "" || c === '-------')) {
        sqlStringarr.push(z);
        queries.push(c)
      }
      //convert array into sql query
      const sqlString = sqlStringarr.toString();
      const text = sqlString.replace(/,/g, "");     
      let sql = `${text}`;

      db.query(sql,queries, (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err);
          return;
        }       
        resolve(result);
      });
    });
  };
  
  module.exports = {
    addGameAsync,
    deleteGameAsync,
    findGameUpAsync,
    findGameDownAsync,
    updateGameAsync,
    getGamebyDeetsAsync,
    changeGameUpAsync,
    changeGameDownAsync,
    refineGameSearchAsync,
  }