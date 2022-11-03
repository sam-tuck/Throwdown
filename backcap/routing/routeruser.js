const express = require("express");
var router = express.Router();
const gamecontroller = require("../gamefinder/gamecontroller");
const gameservice = require("../gamefinder/gameservice");
const usertasks = require("../userItems/userTasks")


router.post("/addgame", function (req, res, next){ 
    gamecontroller.addGame(req)
    .then((game) => {
    if (game) {
        res.status(403).json({
            message: "Game exists"
        });
    } else {
        gamecontroller.addGame(req);
    }});
});

router.post("/update", function (req, res) {
    gameservice.updateGameAsync(req)
    .then((game) => {
        res.send(game[0])
    })
})

router.post("/delete", function (req, res) {
    gameservice.
    deleteGameAsync(req)
    .then((game) => {
        res.send(game[0])
    })
})

// search post funtions
router.post("/changedeetsup", function (req, res, next){
    gameservice
    .changeGameUpAsync(req)
    .then((game) => {
        res.send(game[0]);
    });
})

router.post("/changedeetsdown", function (req, res, next){
    gameservice
    .changeGameDownAsync(req)
    .then((game) => {
        res.send(game[0]);
    });
})

// search gamefinder functions

router.post("/gamedeetsup", function (req, res, next){
    // console.log(req.body)
    const deets = []
    gameservice
    .findGameUpAsync(req)
    .then((game) => {
        // console.log(game[0], 1);
        // error handling for reaching end of list
        if (game[0] === undefined) {
            deets.push({ idgames: 1, gametype: "Start of list",
            playset: "Press up to continue", ruleset: "Back won't work",
            systype: "glhf", booktime: "2022-09-08", addinfo: null, idusers: 1 })
        } else {
            deets.push(game[0])
        }
        usertasks.getUserbyIDAsync(deets[0].idusers)
        .then((user) => {
            // do not return userpassword
            const player = user[0],
                username = player.username,
                email = player.email,
                profilepic = player.profilepic;
               
                
            res.send([deets[0], {username, email, profilepic}]);
        });
    });
})

router.post("/gamedeetsdown", function (req, res, next){
    const deets = []
    gameservice
    .findGameDownAsync(req)
    .then((game) => {
        // error handling not needed as disabled at 1
            deets.push(game[0])
        usertasks.getUserbyIDAsync(deets[0].idusers)
        .then((user) => {
            const player = user[0],
                username = player.username,
                email = player.email,
                profilepic = player.profilepic;
            res.send([deets[0], {username, email, profilepic}]);
        });
    });
})

router.post("/refine", function (req, res) {
    const deets = []
    gameservice.refineGameSearch(req)
    .then((game) => {
      // console.log(game[0], 1);
      // error handling for reaching end of list
      if (game[0] === undefined) {
          deets.push({ idgames: 1, gametype: "Start of list",
          playset: "Press up to continue", ruleset: "Back won't work",
          systype: "glhf", booktime: "2022-09-08", addinfo: null, idusers: 1 })
      } else {
          deets.push(game[0])
      }
      usertasks.getUserbyIDAsync(deets[0].idusers)
      .then((user) => {
          // do not return userpassword
          const player = user[0],
              username = player.username,
              email = player.email,
              profilepic = player.profilepic;
             
              
          res.send([deets[0], {username, email, profilepic}]);
      });
  });
})

module.exports = router;