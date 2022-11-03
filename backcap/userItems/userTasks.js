const {db} = require("../db/db")

var addUserAsync = function (body) {
    return new Promise(function(resolve,reject){
      
      let sql = `INSERT INTO users (username, email, profilepic, \`password\`) VALUES (?,?,?,?)`;
      db.query(sql,[body.username, body.email, body.profilepic, body.password],
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

  
var updateUserAsync = function (body) {
  return new Promise(function(resolve,reject){
    let sql = `update user set ? where id=?`;
    db.query(sql,[body,body.Id],
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
var getUserbyNamePwdAsync = function (name, password) {
  return new Promise(function (resolve, reject) {
    let sql = `SELECT * FROM users where username = ? and password = ?`;
    db.query(sql, [name, password], (err, result) => {
      if (err) {
        console.log(err.message);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

var getUserbyIDAsync = function (id) {
  
  return new Promise(function (resolve, reject) {
    let sql = `SELECT * FROM users where idusers = ?`;
    db.query(sql, [id], (err, result) => {
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
  addUserAsync,
  updateUserAsync,
  getUserbyNamePwdAsync,
  getUserbyIDAsync,
}