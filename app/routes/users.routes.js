
module.exports = app => {
    const users = require("../controllers/users.controller.js");

    var router = require("express").Router();
    router.post("/testing", users.testing);   
    router.post("/changePassword", users.changePassword);   
    router.post("/updateProfile", users.updateProfile);   
    router.post("/updateAvatar", users.updateAvatar);   
    router.post("/sendMagicLink", users.sendMagicLink);
  };
  