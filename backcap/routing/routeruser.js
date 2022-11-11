const express = require("express");
var router = express.Router();
const gamecontroller = require("../gamefinder/gamecontroller");
const gameservice = require("../gamefinder/gameservice");

router.post("/addgame", function (req, res){ 
    gamecontroller.addGame(req, res);
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
router.post("/changedeetsup", function (req, res){
    gameservice
    .changeGameUpAsync(req)
    .then((game) => {
        res.send(game[0]);
    });
})

router.post("/changedeetsdown", function (req, res){
    gameservice
    .changeGameDownAsync(req)
    .then((game) => {
        res.send(game[0]);
    });
})

// search gamefinder functions

router.post("/gamedeetsup", function (req, res){
   gamecontroller.findGameUp(req, res);
})

router.post("/gamedeetsdown", function (req, res){
    gamecontroller.findGameDown(req, res);
})

router.post("/refine", function (req, res) {
    gamecontroller.refineGameSearch(req, res);
})

module.exports = router;