const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyToken = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());
app.use(returnvlue.commonresult);

const routeruser = require("./routing/routeruser");
app.use("/user", verifyToken, routeruser);

const authRouter = require("./routing/auth");
app.use("/auth", authRouter);

app.use(function (req, res, next) {
    res.status(404).json({
      error: "Not Found",
    });
  });
  
  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    res.status(err.status || 500);
    res.json(`  error: ${err.message}`);
  });
  
  module.exports = app;