const gameservice = require("./gameservice");
const usertasks = require("../userItems/userTasks");
const usermgdb = require("../userItems/usermgdb");

function addGame(req, res) {
  gameservice.getGamebyDeetsAsync(req).then((game) => {
    if (game.length > 0) {
      res.status(403).json({
        message: "Game Exists",
      });
    } else {
      gameservice.addGameAsync(req).catch(function (err) {
        console.log(err);
      });
    }
  });
}

function findGameUp(req, res) {
  const deets = [];
  gameservice.findGameUpAsync(req, res).then((game) => {
    // handling for reaching end of list
    if (game[0] === undefined) {
      deets.push({
        idgames: 1,
        gametype: "Start of list",
        playset: "Press up to continue",
        ruleset: "Back won't work",
        systype: "glhf",
        booktime: "2022-09-08",
        addinfo: null,
        idusers: 1,
      });
    } else {
      deets.push(game[0]);
    }
    usertasks.getUserbyIDAsync(deets[0].idusers).then((user) => {
      // do not return userpassword
      const player = user[0],
        username = player.username,
        email = player.email;

      usermgdb.getImage(player.profilepic).then((picture) => {
        let pic = picture[0].piccontent;
        res.send([deets[0], { username, email, pic }]);
      });
    });
  });
}
function findGameDown(req, res) {
  const deets = [];
  gameservice.findGameDownAsync(req, res).then((game) => {
    // error handling not needed as disabled at 1
    deets.push(game[0]);
    usertasks.getUserbyIDAsync(deets[0].idusers).then((user) => {
      const player = user[0],
        username = player.username,
        email = player.email;

      usermgdb.getImage(player.profilepic).then((picture) => {
        let pic = picture[0].piccontent;
        res.send([deets[0], { username, email, pic }]);
      });
    });
  });
}
function refineGameSearch(req, res) {
  const deets = [];
  gameservice.refineGameSearchAsync(req).then((game) => {
    // console.log(game[0], 1);
    // error handling for reaching end of list
    if (game[0] === undefined) {
      deets.push({
        idgames: 1,
        gametype: "Start of list",
        playset: "Press up to continue",
        ruleset: "Back won't work",
        systype: "glhf",
        booktime: "2022-09-08",
        addinfo: null,
        idusers: 1,
      });
    } else {
      deets.push(game[0]);
    }
    usertasks.getUserbyIDAsync(deets[0].idusers).then((user) => {
      // do not return userpassword
      const player = user[0],
        username = player.username,
        email = player.email,
        profilepic = player.profilepic;

      res.send([deets[0], { username, email, profilepic }]);
    });
  });
}

module.exports = {
  addGame,
  findGameUp,
  findGameDown,
  refineGameSearch,
};
