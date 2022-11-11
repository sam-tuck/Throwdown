const { models } = require("mongoose");
const { mgdbClient } = require("../db/mongodb");

let userImageInfo = {};
mgdbClient().then(function (mongoose) {
  const userImageSchema = mongoose.Schema({
    mgdbimageId: String,
    piccontent: String,
    pictype: String,
  });
  userImageInfo = mongoose.model("userImageInfo", userImageSchema);
});

function addUserImage(userImage) {
  let addUserImageInfo = new userImageInfo({
    mgdbimageId: userImage.mgdbimageId,
    piccontent: userImage.piccontent,
    pictype: userImage.pictype,
  });
  addUserImageInfo.save();
}

async function getImage(imageID) {
  return new Promise(function (resolve, reject) {
    userImageInfo.find({ mgdbimageId: imageID }, (err, data) => {
      if (err) {
        console.log(err.message);
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

module.exports = {
  addUserImage,
  getImage,
};
