const express = require("express");
const router = express.Router();

var admin = require("firebase-admin");
var serviceAccount = require("../../test-1d5a2-firebase-adminsdk-63mx9-48852973c2.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

router.get("/:deviceToken", (req, res, next) => {
  const { params } = req;
  var message = {
    data: {
      score: "850",
      time: "2:45"
    }
  };
  admin
    .messaging()
    .sendToDevice(params.deviceToken, message)
    .then((response) => {
      res.status(201).json({
        message: "Successfully sent message",
        response: response
      });
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      next(error);
    });
});

module.exports = router;
