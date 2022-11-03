const mongoose = require("mongoose");
const { mongodbConfig } = require("../config");

const mgdbClient = function () {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      "mongodb://" + mongodbConfig.host,
      {
        dbName: mongodbConfig.dbName,
        user: mongodbConfig.user,
        pass: mongodbConfig.pass,
      },
      (err, client) => {
        if (err) {
          reject(err);
        } else {
            resolve(mongoose);
        }
      }
    );
  });
};

module.exports = {
    mgdbClient
};