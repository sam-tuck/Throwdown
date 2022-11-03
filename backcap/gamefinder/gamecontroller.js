const gameservice = require("./gameservice");
const usertasks = require("../user-items/userTasks");


function addGame(req, res) {
  gameservice.getGamebyDeetsAsync(req)
  .then((game) => {
    if (game.length > 0) {
      res.status(403).json({
        message: "Game Exists"
    });
    } else {
      gameservice.addGameAsync(req)
     .catch(function (err) {
       console.log(err);
     });
  } 
});
}



  module.exports = {
    addGame,
  }