module.exports = app => {
  const users = require("../controllers/users.controller.js");
  var router = require("express").Router();
  router.post("/login", users.login);   
  router.post("/getBestCustomers", users.getBestCustomers);   
  router.post("/changePassword", users.changePassword);   
  router.post("/updateProfile", users.updateProfile);   
  router.post("/updateAvatar", users.updateAvatar);   
  router.post("/sendMagicLink", users.sendMagicLink);
  app.use('/api/users', router);
};