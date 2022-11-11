const userservice = require("./userTasks");
const formidable = require("formidable");
const path = require("path");
const uuid = require("uuid");
const {addUserImage} = require("./usermgdb");
const fs = require("fs");
const jwt = require("jsonwebtoken");

function generateAccessToken(userData) {
  return jwt.sign({ userData }, process.env.TOKEN_SECRET, {
      expiresIn: "2h",
  });
}


function getUserbyName(req, res) {
  userservice
    .getUserbyNameAsync(req.query.name)
    .then(function (result) {
      res.resultvalue(result, "request success");
    })
    .catch(function (err) {});
}


function addUser(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: path.join(__dirname, "../bin/public/uploads"),
    keepExtensions: true,
  });
  form.parse(req, (err, fields, files) => {
      if (err) {  return; }
      // create random id for pic
      let mgdbimageId = uuid.v4();
      let userBody={
          username: fields.username,
          email: fields.email,
          password: fields.password,
          profilepic: mgdbimageId
      };
          // check for existing user
      userservice.getUserbyNamePwdAsync(userBody.username, userBody.password)
      .then((user) => {        
          if (user.length > 0) {
              res.status(403).json({
              message: "Username or email exists"
              });
          } else {
                // check for pic
            if (files.hasOwnProperty("avatar")) {
              const { filepath, newFilename } = files.avatar;
              console.log(filepath);
              fs.readFile(filepath, "base64", function (err, data) {
                  if (err) {
                    return res.resultvalue({}, err, 1);
                  }
                  let exName = path.extname(filepath);
                  // upload image to mgdb      
                  addUserImage({
                      mgdbimageId: mgdbimageId,
                      piccontent: data,
                      pictype: exName,
                  });
                    // clean up file
                    try {
                      fs.unlinkSync(path.join(__dirname, `../bin/public/uploads/${newFilename}`))
                    } catch(err) {
                      console.error(err)
                    }                                                  
                      //  create user in mysql
                  userservice.addUserAsync(userBody);
                  userservice.getUserbyNamePwdAsync(userBody.username, userBody.password)
                  .then((newUser) => {      
                      const accessToken = generateAccessToken({
                      id: newUser.idusers,
                      username: newUser.username,
                      });
                      res.status(200).json({
                      name: newUser.username,
                      accessToken: accessToken,
                      });
                  });
              });
            } else { 
               userBody.profilepic = "79f003ef-609d-46d8-adfd-8a8aece57532";
                      //  create user in mysql with default pic
                  userservice.addUserAsync(userBody);
                  userservice.getUserbyNamePwdAsync(userBody.username, userBody.password)
                  .then((newUser) => {      
                      const accessToken = generateAccessToken({
                      id: newUser.idusers,
                      username: newUser.username,
                      });
                      res.status(200).json({
                      name: newUser.username,
                      accessToken: accessToken,
                      });
                  });
            }
          } 
      });
  });
}


function updateUser(req, res) {
    console.log("updateUser");
    userservice
      .updateUserAsync(req.body)
      .then(function (result) {
        res.resultvalue(result, "request success");
      })
      .catch(function (err) {
        res.resultvalue([], err);
        console.log(err);
      });
  }
  

module.exports = {
  getUserbyName,
  addUser,
  updateUser
};